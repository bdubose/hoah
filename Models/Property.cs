using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("properties")]
public class Property
{
    [Key] public int PropertyId { get; set; }
    public int StreetNumber { get; set; }
    public string Street { get; set; } = "";
    public string? LotNum { get; set; }
    public string? Sector { get; set; }
    public string? MapBook { get; set; }
    public string? Page { get; set; }
}