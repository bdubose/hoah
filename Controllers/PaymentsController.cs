using HoahServer.Models;
using HoahServer.Repos;
using Microsoft.AspNetCore.Mvc;

namespace HoahServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly PaymentRepo _payments;

    public PaymentsController(PaymentRepo payments)
    {
        _payments = payments;
    }
    
    [HttpPost]
    public async Task Add([FromBody] Payment payment)
    {
        await _payments.Add(payment);
    }
}