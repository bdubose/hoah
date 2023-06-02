using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("payments")]
public class Payment
{
    [Key] public int PaymentId { get; set; }
    public int HomeownerId { get; set; }
    public decimal Amount { get; set; }
    public DateOnly? DatePaid { get; set; }
    public string? Reference { get; set; }
    public DateOnly? DepositDate { get; set; }
}