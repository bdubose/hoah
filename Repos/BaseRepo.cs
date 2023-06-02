using HoahServer.Services;

namespace HoahServer.Repos;

public abstract class BaseRepo
{
    protected readonly DbService Db;

    protected BaseRepo(DbService db)
    {
        Db = db;
    }
}