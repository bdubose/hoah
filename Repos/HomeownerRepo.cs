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
    public async Task<HomeownerDetails> GetDetails(int id)
    {
        using var con = Db.Con;
        using var multi = await con.QueryMultipleAsync(@"
            select h.*
            from homeowners h
            where h.homeowner_id = @id
            ;
            select p.*
            from properties p
            join homeowners h on p.property_id = h.property_id
            where h.homeowner_id = @id
            ;
            select f.*, ft.fee_type_name
            from fees f
            join fee_types ft on f.fee_type_id = ft.fee_type_id
            where f.homeowner_id = @id
            ;
            select p.*
            from payments p
            where p.homeowner_id = @id
            ;
            select l.*
            from liens l
            where l.homeowner_id = @id
            ;
            select n.*
            from notes n
            join properties p on n.property_id = p.property_id
            join homeowners h on p.property_id = h.property_id
            where h.homeowner_id = @id",
            new { id });

        var homeownerDetails = await multi.ReadSingleAsync<HomeownerDetails>();
        homeownerDetails.Property = await multi.ReadSingleAsync<Property>();
        homeownerDetails.Fees = await multi.ReadAsync<Fee>();
        homeownerDetails.Payments = await multi.ReadAsync<Payment>();
        homeownerDetails.Liens = await multi.ReadAsync<Lien>();
        homeownerDetails.PropertyNotes = await multi.ReadAsync<Note>();
        
        return homeownerDetails;
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