
using System.Data;
using Npgsql;

namespace HoahServer.Services;
public class DbService
{
    private readonly string _conStr;
    public DbService(IConfiguration cfg)
    {
        _conStr = cfg.GetConnectionString("Default") ?? throw new Exception("Could not find connection string!");
    }

    public IDbConnection Con
    {
        get { return new NpgsqlConnection(_conStr); }
    }
}