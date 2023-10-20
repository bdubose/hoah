using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("Liens")]
public class Lien
{
    [Key] public int Id { get; set; }
    public int HomeownerId { get; set; }
    public decimal Amount { get; set; }
    public int LienYear { get; set; }
    public int LienStatusId { get; set; }

    [Write(false)] public string? LienStatus { get; set; }
}