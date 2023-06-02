using HoahServer.Models;
using HoahServer.Repos;
using Microsoft.AspNetCore.Mvc;

namespace HoahServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeownersController : ControllerBase
{
    private readonly HomeownerRepo _homeowners;

    public HomeownersController(HomeownerRepo homeowners)
    {
        _homeowners = homeowners;
    }

    [HttpGet]
    public async Task<IEnumerable<Homeowner>> GetAll()
    {
        return await _homeowners.GetAll();
    }

    [HttpPost]
    public async Task<int> Add([FromBody] Homeowner homeowner)
    {
        return await _homeowners.Add(homeowner);
    }
}