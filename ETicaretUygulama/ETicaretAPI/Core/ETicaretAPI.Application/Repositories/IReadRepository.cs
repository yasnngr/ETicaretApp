using ETicaretAPI.Domain.Entities.Common;
using System.Linq.Expressions;

namespace ETicaretAPI.Application.Repositories
{
    public interface IReadRepository<T> : IRepository<T> where T: BaseEntity
    {
        IQueryable<T> GetAll(bool tracking = true);
        IQueryable<T> GeTWhere(Expression<Func<T,bool>> method, bool tracking = true);//Özel tanımlı fonksiyona verilen şart ifadesi doğru olan datalar getirilir
        Task<T> GetSingleAsync(Expression<Func<T,bool>> method, bool tracking = true);//Expression<Func<T,bool>> Method lampa fonksiyon olarak şart sağlanması
        Task<T> GetByIdAsync (string id, bool tracking = true);//Task<>Asenkron olduğunu belirtir
    }
}
