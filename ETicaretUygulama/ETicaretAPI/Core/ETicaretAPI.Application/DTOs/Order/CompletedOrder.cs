﻿namespace ETicaretAPI.Application.DTOs.Order
{
    public class CompletedOrderDTO
    {
        public string OrderCode { get; set; }
        public DateTime OrderDate { get; set; }
        public string UserSurname { get; set; }
        public string EMail { get; set; }
    }
}
