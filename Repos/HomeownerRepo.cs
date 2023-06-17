using Dapper;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class HomeownerRepo : BaseRepo
{
    public HomeownerRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Homeowner>> GetAll()
    {
        using var con = Db.Con;
        return await con.QueryAsync<Homeowner>(@"
            select h.*, concat(p.street_number, ' ', p.street) as property
            from homeowners h
            join properties p on h.property_id = p.property_id");
    }
    public async Task<Homeowner> GetById(int id)
    {
        using var con = Db.Con;
        return await con.QuerySingleAsync<Homeowner>(@"
            select h.*, concat(p.street_number, ' ', p.street) as property
            from homeowners h
            join properties p on h.property_id = p.property_id
            where h.homeowner_id = @id",
            new { id });
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