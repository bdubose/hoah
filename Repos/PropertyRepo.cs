using Dapper;
using Dapper.Contrib.Extensions;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class PropertyRepo : BaseRepo
{
    public PropertyRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Property>> GetAll()
    {
        using var con = Db.Con;
        return await con.GetAllAsync<Property>();
    }

    public async Task<int> Add(Property property)
    {
        using var con = Db.Con;
        return await con.QueryFirstAsync<int>(@"
            insert into properties(street_number, street)
            values (@StreetNumber, @Street)
            returning property_id",
            property);
    }
}