using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("Payments")]
public class Payment
{
    [Key] public int Id { get; set; }
    public int HomeownerId { get; set; }
    public decimal Amount { get; set; }
    public string? DatePaid { get; set; }
    public string? Reference { get; set; }
    public string? DepositDate { get; set; }
}