using HoahServer.Models;
using HoahServer.Repos;
using Microsoft.AspNetCore.Mvc;

namespace HoahServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly PropertyRepo _properties;

    public PropertiesController(PropertyRepo properties)
    {
        _properties = properties;
    }

    [HttpGet]
    public async Task<IEnumerable<Property>> GetAll()
    {
        return await _properties.GetAll();
    }

    [HttpPost]
    public async Task<int> Add([FromBody] Property property)
    {
        return await _properties.Add(property);
    }
}