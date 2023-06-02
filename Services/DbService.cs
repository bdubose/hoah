
using System.Data;
using Npgsql;

namespace HoahServer.Services;
public class DbService
{
    public IDbConnection Con { get; }
    public DbService(IConfiguration cfg)
    {
        Con = new NpgsqlConnection(cfg.GetConnectionString("Default"));
    }
}