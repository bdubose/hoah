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
            select h.*, concat(p.streetNumber, ' ', p.street) as property
            from homeowners h
            join properties p on h.PropertyId = p.Id");
    }
    public async Task<Homeowner> GetById(int id)
    {
        using var con = Db.Con;
        return await con.QuerySingleAsync<Homeowner>(@"
            select h.*, concat(p.streetNumber, ' ', p.street) as property
            from homeowners h
            join properties p on h.PropertyId = p.Id
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
            join homeowners h on p.id = h.propertyId
            where h.Id = @id
            ;
            select f.*, ft.Name as FeeTypeName
            from fees f
            join FeeTypes ft on f.feeTypeId = ft.id
            where f.homeownerId = @id
            ;
            select p.*
            from payments p
            where p.homeownerId = @id
            ;
            select l.*
            from liens l
            where l.homeownerId = @id
            ;
            select n.*
            from notes n
            join properties p on n.propertyId = p.id
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
            output inserted.Id
            values (@FullName, @Email, @PropertyId, @MoveInDate)",
            homeowner);
    }

}