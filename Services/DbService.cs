
using System.Data.SqlClient;

namespace HoahServer.Services;
public class DbService
{
    private readonly string _conStr;
    public DbService(IConfiguration cfg)
    {
        _conStr = cfg.GetConnectionString("Default") ?? throw new Exception("Could not find connection string!");
    }

    public SqlConnection Con
    {
        get { return new SqlConnection(_conStr); }
    }
}