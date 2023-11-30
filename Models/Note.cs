using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("notes")]
public class Note
{
    [Key] public int Id { get; set; }
    public int PropertyId { get; set; }
    public string Content { get; set; } = "";
    public DateOnly NoteDate { get; set; }
}