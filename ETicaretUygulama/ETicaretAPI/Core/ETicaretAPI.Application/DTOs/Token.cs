﻿namespace ETicaretAPI.Application.DTOs
{
    public class Token
    {
        public string AccessToken { get; set; }
        public DateTime Expiration { get; set; }
        public string? RefleshToken { get; set; }
    }
}