using Dapper.Contrib.Extensions;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class LienRepo : BaseRepo
{
    public LienRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Lien>> GetAll()
    {
        using var con = Db.Con;
        return await con.GetAllAsync<Lien>();
    }

    public async Task<int> Add(Lien lien)
    {
        using var con = Db.Con;
        return await con.InsertAsync(lien);
    }
}