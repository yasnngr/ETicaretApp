﻿namespace ETicaretAPI.Application.Abstructions.Services
{
    public interface IMailService
    {
        Task SendMailAsync(string to,string subject,string body,bool isBodyHtml=true);
        Task SendMailAsync(string[] tos,string subject,string body,bool isBodyHtml=true);
        Task SendPasswordResentMailAsync(string to, string userId, string resetToken);
        Task SendCompletedOrderMailAsync(string to, string orderCode, DateTime orderDate, string userSurname);
    }
}