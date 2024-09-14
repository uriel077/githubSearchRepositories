using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Data.Models;
using Microsoft.AspNetCore.Authorization;

namespace GithubPhoenix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GithubSearchController : ControllerBase
    {
        [HttpGet("search/{keyword}")]
        public async Task<IActionResult> SearchRepositories(string keyword)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("User-Agent", "urielCompany");

            try
            {
                var result = await client.GetStringAsync($"https://api.github.com/search/repositories?q={keyword}");

                var jsonDocument = JsonDocument.Parse(result);
                var items = jsonDocument.RootElement.GetProperty("items");

                var filteredRepositories = new List<object>();

                foreach (var item in items.EnumerateArray())
                {
                    // Filter repository name and avatar_url
                    var repositoryName  = item.GetProperty("name").GetString();
                    var avatarUrl       = item.GetProperty("owner").GetProperty("avatar_url").GetString();
                    var id              = item.GetProperty("id").GetInt32();

                    filteredRepositories.Add(new GithubRepository
                    {
                        Name        = repositoryName ?? "",
                        AvatarUrl   = avatarUrl ?? "",
                        Id          = id,
                    }
                    );
                }

                return Ok(filteredRepositories);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
        }
    }
}
