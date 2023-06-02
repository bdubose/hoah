using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("liens")]
public class Lien
{
    [Key] public int LienId { get; set; }
    public int PropertyOwnerId { get; set; }
    public decimal Amount { get; set; }
    public int LienYear { get; set; }
    public bool IsPaid { get; set; }
}