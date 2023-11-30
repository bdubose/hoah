using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("fees")]
public class Fee
{
    [Key] public int Id { get; set; }
    public int FeeTypeId { get; set; }
    public int HomeownerId { get; set; }
    public decimal Amount { get; set; }
    public int FeeYear { get; set; }

    [Write(false)] public string FeeTypeName { get; set; } = "";
}