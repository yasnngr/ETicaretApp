﻿using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Entities.Identity;

namespace ETicaretAPI.Domain.Entities
{
    public class Basket : BaseEntity
    {
        public string UserId { get; set; }//AppUser'ın string keyde oluşturulduğu için bunu da string tanımlıyoruz
        public AppUser User { get; set; }
        public Order Order { get; set; }
        public ICollection<BasketItem> BasketItems {  get; set; }
    }
}
