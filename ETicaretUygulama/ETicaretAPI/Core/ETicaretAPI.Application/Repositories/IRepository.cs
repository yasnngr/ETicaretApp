using ETicaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Application.Repositories
{//Application'da interfaceler tanımlanacak Persistence'de Concreteler tanımlanacak
    //Temel/base verileri tutsun
    public interface IRepository<T> where T: BaseEntity
    {
        DbSet<T> Table { get; }//Genelleştirmek için <T> veriyoruz Product mu order mı olduğuna yazılımsal olarak karar vercez
    //DbSet üzerinden eriştiğimiz için DbSet base interface olarak tanımlıyoruz
    }
}
