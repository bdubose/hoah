﻿using Dapper;
using HoahServer.Models;
using HoahServer.Services;

namespace HoahServer.Repos;

public class PropertyRepo : BaseRepo
{
    // TODO: fix: properties can have multiple homeowners
    public PropertyRepo(DbService db) : base(db) { }

    public async Task<IEnumerable<Property>> GetAll()
    {
        using var con = Db.Con;
        return await con.QueryAsync<Property>(@"
            select p.*, h.Full_name as homeowner
            from properties p
            left outer join homeowners h on p.Id = h.Property_id");
    }
    public async Task<Property> GetById(int id)
    {
        using var con = Db.Con;
        return await con.QuerySingleAsync<Property>(@"
            select p.*
            from properties p
            where Id = @id",
            new { id });
    }

    public async Task<int> Add(Property property)
    {
        using var con = Db.Con;
        return await con.QuerySingleAsync<int>(@"
            insert into properties(Street_number, Street)
            values (@StreetNumber, @Street)
            returning id",
            property);
    }
}