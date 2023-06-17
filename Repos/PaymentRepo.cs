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
            insert into payments(homeowner_id, amount, date_paid, reference)
            values (@HomeownerId, @Amount, @DatePaid::date, @Reference)",
            payment);
    }
}