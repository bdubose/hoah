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

public class HomeownerDetails : Homeowner
{
    public new Property Property { get; set; } = new();
    public IEnumerable<Fee> Fees { get; set; } = new List<Fee>();
    public IEnumerable<Payment> Payments { get; set; } = new List<Payment>();
    public IEnumerable<Lien> Liens { get; set; } = new List<Lien>();
    public IEnumerable<Note> PropertyNotes { get; set; } = new List<Note>();
}