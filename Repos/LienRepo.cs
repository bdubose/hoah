using Dapper;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class LienRepo : BaseRepo
{
    public LienRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Lien>> GetAll()
    {
        using var con = Db.Con;
        return await con.QueryAsync<Lien>(@"
            select l.*, ls.Name as LienStatus
            from Liens l
            join LienStatuses ls on ls.Id = l.LienStatusId");
    }

    public async Task<int> Add(Lien lien)
    {
        using var con = Db.Con;
        return await con.QueryFirstAsync<int>(@"
            insert into Liens(HomeownerId, LienStatusId, Amount, LienYear)
            output inserted.Id
            select @HomeownerId, ls.Id, @Amount, @LienYear
            from LienStatuses ls
            where ls.Name = 'Submitted'",
            lien);
    }
}