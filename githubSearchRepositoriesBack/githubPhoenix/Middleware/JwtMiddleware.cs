namespace githubPhoenix.Middleware
{
    using Microsoft.AspNetCore.DataProtection.KeyManagement;
    using Microsoft.AspNetCore.Http;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Runtime;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;

    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenService _tokenService;
        private readonly HashSet<string> _publicPaths;
        private readonly IConfiguration _configuration;

        public JwtMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
            _tokenService = new TokenService(_configuration["Jwt:Secret"], _configuration["Jwt:Issuer"], _configuration["Jwt:Audience"]);
        }

        public JwtMiddleware(IConfiguration configuration, RequestDelegate next): this(configuration)
        {
            _publicPaths = new HashSet<string>(new string[]{ "/api/Auth/login", "/api/Auth/logout" }, StringComparer.OrdinalIgnoreCase);

            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Check if the current path is in the public paths list
            if (_publicPaths.Contains(context.Request.Path))
            {
                // Skip authorization for public paths
                await _next(context);
                return;
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            
            if (token != null)
            {
                var tokenIsLegit = _tokenService.Validate(token);

                if (!tokenIsLegit)
                {
                    var cookieOptions = new CookieOptions
                    {
                        Path = "/",
                        HttpOnly = true,
                        Secure = true,
                        Expires = DateTime.UtcNow.AddMinutes(-1),
                    };

                    context.Response.Cookies.Append("AuthCookie", "", cookieOptions);
                    context.Response.Headers.Append("JWT", "");

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized");
                    return;
                }
            }
          
            // Call the next middleware in the pipeline
            await _next(context);
        }
    }
}
