using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("properties")]
public class Property
{
    [Key] public int PropertyId { get; set; }
    public int StreetNumber { get; set; }
    public string Street { get; set; } = "";
}