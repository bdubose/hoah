using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("homeowners")]
public class Homeowner
{
    [Key] public int HomeownerId { get; set; }
    public int PropertyId { get; set; }
    public string FullName { get; set; } = "";
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string MoveInDate { get; set; } = "";
    public string? MoveOutDate { get; set; }

    [Write(false)] public string Property { get; set; } = "";
}