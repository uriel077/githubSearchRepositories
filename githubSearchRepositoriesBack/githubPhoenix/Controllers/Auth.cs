using Microsoft.AspNetCore.Mvc;
using Data.Models;

namespace GithubPhoenix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _tokenService = new TokenService(_configuration["Jwt:Secret"], _configuration["Jwt:Issuer"], _configuration["Jwt:Audience"]);
        }
        
        /// <summary>
        /// Validate the given username.
        /// </summary>
        /// <param name="credentials">The user details.</param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> LoginPost([FromBody] UserCredentials credentials)
        {
            if (credentials.Username == "uriel")
            {
                var token = _tokenService.GenerateToken(credentials.Username);

                var cookieOptions = new CookieOptions
                {
                    Path        = "/",
                    HttpOnly    = true,
                    Secure      = true,
                    Expires     = DateTime.UtcNow.AddMinutes(30)    
                };
                
                Response.Cookies.Append("AuthCookie", token, cookieOptions);
                Response.Headers.Append("JWT", token);

                return Ok(new { token });
            }

            return Unauthorized("Invalid username or password.");
        }
        
        /// <summary>
        /// Logout from the site.
        /// </summary>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var cookieOptions = new CookieOptions
            {
                Path        = "/",
                HttpOnly    = true,
                Secure      = true,
                Expires     = DateTime.UtcNow.AddMinutes(-1),
            };

            Response.Cookies.Append("AuthCookie", "", cookieOptions);

            return Ok(new { message = "Logged out successfully" });
        }
    }
}
