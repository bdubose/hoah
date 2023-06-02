using HoahServer.Models;
using HoahServer.Repos;
using Microsoft.AspNetCore.Mvc;

namespace HoahServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LiensController : ControllerBase
{
    private readonly LienRepo _liens;

    public LiensController(LienRepo liens)
    {
        _liens = liens;
    }

    [HttpGet]
    public async Task<IEnumerable<Lien>> GetAll()
    {
        return await _liens.GetAll();
    }

    [HttpPost]
    public async Task<int> Add([FromBody] Lien lien)
    {
        return await _liens.Add(lien);
    }
}