using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Persistence.Contexts
{// VeriTababanına karşılık gelen kod kısmı. Veri tabanını modelliyoruz
    public class ETicaretAPIDbContext : IdentityDbContext<AppUser,AppRole,string>//Artık dbcontextten türetmeyecez IdentityContextten türetecez kullanıcı kayıt işlemleri için
    {
        public ETicaretAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } //Veritabanının içerisinde bu formatta bir tablo olacağını tanımladık içerisindeki proplar ile kolonlar eşleştirilir
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Domain.Entities.File> Files { get; set; }
        public DbSet<ProductImageFile> ProductImageFiles { get; set; }
        public DbSet<InvoiceFile> InvoiceFiles { get; set; }


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            #region Not
//            ChangeTracker.Entries<BaseEntity>(): Bu property, Entity Framework tarafından takip edilen tüm entity'lerin bir listesini verir. Bu listede, yeni eklenen, güncellenen veya silinen entity'ler bulunur.
//            foreach (var data in datas): Bu döngü, ChangeTracker.Entries property'sinden gelen her bir entity için tetiklenir.
//            data.State switch: Bu switch-case yapısı, entity'nin mevcut durumuna göre farklı işlemler yapılmasını sağlar.
//            EntityState.Added: Yeni eklenen entity'ler için, CreatedDate property'si o anki UTC zamanına ayarlanır.
//            EntityState.Modified: Güncellenen entity'ler için, UpdatedDate property'si o anki UTC zamanına ayarlanır.
//            _ = data.Entity.CreatedDate = DateTime.UtcNow;: Bu satırda, CreatedDate property'sine değer atanması için bir atama işlemi yapılmaktadır. _ operatörü, atanma işleminin sonucunu göz ardı etmek için kullanılır.
//            return await base.SaveChangesAsync(cancellationToken);: Bu satır, asıl SaveChangesAsync metodunu çağırarak değişikliklerin veritabanına kaydedilmesini sağlar.
                #endregion
            var datas = ChangeTracker.Entries<BaseEntity>();//Entityler üzerinden yapılan değişikler ya da yeni eklenen verileri yakalayan property
            foreach (var data in datas) 
            {
                _ = data.State switch // _ ->Herhangi bir atama işlemi yapmasını istemiyorum demek
                {
                    EntityState.Added => data.Entity.CreatedDate=DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate=DateTime.UtcNow,
                   _ => DateTime.UtcNow //delete işleminde hata veriyordu o yüzden ekledik
                };
            }
               return await base.SaveChangesAsync(cancellationToken);
        }
    }
    
}
//IOC containera eklememiz lazım erişebilsin diye bunu da ServiceRegistration'da yapıyoruz 
//Katmanlar arasında bir şeyler göndermek için Core->Infrastructure->Presentation arasında ServiceRegistration kullanılmalı