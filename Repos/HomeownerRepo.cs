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
            join properties p on h.Property_id = p.Id");
    }
    public async Task<Homeowner> GetById(int id)
    {
        using var con = Db.Con;
        return await con.QuerySingleAsync<Homeowner>(@"
            select h.*, concat(p.street_number, ' ', p.street) as property
            from homeowners h
            join properties p on h.property_id = p.Id
            where h.Id = @id",
            new { id });
    }
    public async Task<HomeownerDetails> GetDetails(int id)
    {
        using var con = Db.Con;
        using var multi = await con.QueryMultipleAsync(@"
            select h.*
            from homeowners h
            where h.id = @id
            ;
            select p.*
            from properties p
            join homeowners h on p.id = h.property_id
            where h.Id = @id
            ;
            select f.*, ft.Name as FeeTypeName
            from fees f
            join Fee_types ft on f.fee_type_id = ft.id
            where f.homeownerId = @id
            ;
            select p.*
            from payments p
            where p.homeowner_id = @id
            ;
            select l.*, ls.Name as LienStatus
            from liens l
            join Lien_statuses ls on ls.Id = l.Lien_status_id
            where l.homeownerId = @id
            ;
            select n.*
            from notes n
            join properties p on n.property_id = p.id
            join homeowners h on p.id = h.propertyId
            where h.id = @id",
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
            insert into homeowners(fullName, email, propertyId, moveInDate)
            values (@FullName, @Email, @PropertyId, @MoveInDate)
            returning id",
            homeowner);
    }

}