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
        using var con = Db.Con;
        return await con.QueryAsync<Lien>(@"
            select l.*, ls.Name as LienStatus, concat(h.full_name, ' - ', p.Street_number, ' ', p.Street) as OwnerAndProperty
            from Liens l
            join Lien_statuses ls on ls.Id = l.Lien_status_id
            join Homeowners h on h.Id = l.Homeowner_id
            join Properties p on p.Id = h.Property_id");
    }

    public async Task<IEnumerable<LienStatus>> GetAllStatuses()
    {
        using var con = Db.Con;
        return await con.GetAllAsync<LienStatus>();
    }

    public async Task<int> Add(Lien lien)
    {
        using var con = Db.Con;
        return await con.QueryFirstAsync<int>(@"
            insert into Liens(Homeowner_id, Lien_status_id, Amount, Lien_year)
            output inserted.Id
            select @HomeownerId, ls.Id, @Amount, @LienYear
            from Lien_statuses ls
            where ls.Name = 'Submitted'",
            lien);
    }

    public async Task UpdateStatus(LienStatusUpdate lsu)
    {
        using var con = Db.Con;
        await con.ExecuteAsync(@"
            update Liens
            set Lien_status_id = @LienStatusId
            where Id = @LienId",
            lsu);
    }
}