using Dapper.Contrib.Extensions;

namespace HoahServer.Models;

[Table("Notes")]
public class Note
{
    [Key] public int Id { get; set; }
    public int PropertyId { get; set; }
    public string Content { get; set; } = "";
    public DateOnly NoteDate { get; set; }
}