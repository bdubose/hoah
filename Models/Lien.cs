using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("Liens")]
public class Lien
{
    [Key] public int Id { get; set; }
    public int PropertyOwnerId { get; set; }
    public decimal Amount { get; set; }
    public int LienYear { get; set; }
    public bool IsPaid { get; set; }
}