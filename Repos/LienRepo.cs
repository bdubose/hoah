using Dapper;
using Dapper.Contrib.Extensions;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class LienRepo : BaseRepo
{
    public LienRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Lien>> GetAll()
    {
        await using var con = Db.Con;
        return await con.QueryAsync<Lien>(@"
            select l.*, ls.Name as LienStatus, concat(h.FullName, ' - ', p.StreetNumber, ' ', p.Street) as OwnerAndProperty
            from Liens l
            join LienStatuses ls on ls.Id = l.LienStatusId
            join Homeowners h on h.Id = l.HomeownerId
            join Properties p on p.Id = h.PropertyId");
    }

    public async Task<IEnumerable<LienStatus>> GetAllStatuses()
    {
        await using var con = Db.Con;
        return await con.GetAllAsync<LienStatus>();
    }

    public async Task<int> Add(Lien lien)
    {
        await using var con = Db.Con;
        return await con.QueryFirstAsync<int>(@"
            insert into Liens(HomeownerId, LienStatusId, Amount, LienYear)
            output inserted.Id
            select @HomeownerId, ls.Id, @Amount, @LienYear
            from LienStatuses ls
            where ls.Name = 'Submitted'",
            lien);
    }

    public async Task UpdateStatus(LienStatusUpdate lsu)
    {
        await using var con = Db.Con;
        await con.ExecuteAsync(@"
            update Liens
            set LienStatusId = @LienStatusId
            where Id = @LienId",
            lsu);
    }
}