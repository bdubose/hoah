using Dapper;
using Dapper.Contrib.Extensions;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class HomeownerRepo : BaseRepo
{
    public HomeownerRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Homeowner>> GetAll()
    {
        using var con = Db.Con;
        return await con.GetAllAsync<Homeowner>();
    }

    public async Task<int> Add(Homeowner homeowner)
    {
        using var con = Db.Con;
        return await con.QueryFirstAsync<int>(@"
            insert into homeowners(full_name, email, property_id, move_in_date)
            values (@FullName, @Email, @PropertyId, @MoveInDate::date)
            returning homeowner_id",
            homeowner);
    }
}