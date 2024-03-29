using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("properties")]
public class Property
{
    [Key] public int Id { get; set; }
    public int StreetNumber { get; set; }
    public string Street { get; set; } = "";
    public string? LotNum { get; set; }
    public string? Sector { get; set; }
    public int? MapBook { get; set; }
    public int? MapPage { get; set; }

    [Write(false)] public string? Homeowner { get; set; }
}