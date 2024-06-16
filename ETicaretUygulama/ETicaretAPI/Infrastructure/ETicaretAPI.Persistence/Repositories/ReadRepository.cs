﻿using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ETicaretAPI.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly ETicaretAPIDbContext _context;//_context.Set<T>(); şeklinde crud işlemleri yapıyorduk ama base olarak DbSet türünden Table Tanımladık ve kısaca onu kullanıyoruz
        public ReadRepository(ETicaretAPIDbContext context)
        {
            _context = context;
        }
        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll(bool tracking = true)
        { 
            var query = Table.AsQueryable();//tracking optimizasyonu
            if (!tracking)
                query = query.AsNoTracking();
            return query;
        }   

        public IQueryable<T> GeTWhere(Expression<Func<T, bool>> method,bool tracking = true)
        {
            var query = Table.Where(method);
            if(!tracking)
                query = query.AsNoTracking();
            return query;
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query = Table.AsNoTracking();
            return await query.FirstOrDefaultAsync(method);
        }

       
        public async Task<T> GetByIdAsync(string id, bool tracking = true)
        //=>await Table.FirstOrDefaultAsync(data=>data.Id==Guid.Parse(id)); baseEntityden id değerini çekiyorduk ana findAsync fonksiyonu direkt olarak id'yi çekiyoruz
        //=>await Table.FindAsync(Guid.Parse(id));
        {
            var query = Table.AsQueryable();
            if(!tracking)
                query = Table.AsNoTracking();
            return await query.FirstOrDefaultAsync(data=>data.Id==Guid.Parse(id));//FindAsync metodu asQuerable'da olmadığı için ilk versiyona dönüyoruz
        }
            

    }
}