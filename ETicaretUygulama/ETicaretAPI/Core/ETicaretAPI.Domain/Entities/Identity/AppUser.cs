using Microsoft.AspNetCore.Identity;

namespace ETicaretAPI.Domain.Entities.Identity
{
    public class AppUser : IdentityUser<string>
    {
        public string NameSurname { get; set; }
        public string? RefleshToken { get; set; }
        public DateTime? RefleshTokenLifeTime { get; set; }
        public ICollection<Basket> Baskets { get; set; }
    }
}
