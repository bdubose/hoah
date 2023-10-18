using Dapper;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class PaymentRepo : BaseRepo
{
    public PaymentRepo(DbService db) : base(db) { }

    public async Task Add(Payment payment)
    {
        using var con = Db.Con;
        await con.ExecuteAsync(@"
            insert into payments(homeownerId, amount, datePaid, reference)
            values (@HomeownerId, @Amount, @DatePaid, @Reference)",
            payment);
    }
}