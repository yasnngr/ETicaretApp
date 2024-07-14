using ETicaretAPI.Application.Abstructions.Services;
using Google.Apis.Http;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace ETicaretAPI.Infrastructure.Services
{
    public class MailService : IMailService
    {
        readonly IConfiguration _configuration;

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

       

        public async Task SendMailAsync(string to, string subject, string body, bool isBodyHtml = true)
        {
            await SendMailAsync(new[] { to }, subject,body,isBodyHtml);
        }

        public async Task SendMailAsync(string[] tos, string subject, string body, bool isBodyHtml = true)
        {
            MailMessage mail = new MailMessage();

            mail.IsBodyHtml = isBodyHtml;
            foreach (string to in tos)
                mail.To.Add(to);
            mail.Subject = subject;
            mail.Body = body;

            mail.From = new(_configuration["Mail:Username"], "ETicaretDb",System.Text.Encoding.UTF8);

            SmtpClient smtp = new SmtpClient();
            smtp.Credentials = new NetworkCredential(_configuration["Mail:Username"], _configuration["Mail:Password"]);
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Host = _configuration["Mail:Host"];
            
            await smtp.SendMailAsync(mail);
        }

        public async Task SendPasswordResentMailAsync(string to, string userId,string resetToken)
        {
            string mail =$@"
                        Hello <br> 
                        If you have requested a new password change, you can reset your password using the link below.<br>
                        <strong><a target=""_blank"" href=""{_configuration["AngularClientUrl"]}/update-password/{userId}/{resetToken}""> Click here to request a new password.</a></strong> <br><br>
                        <span>If you did not request a password change, please change your password.</span><br><br><br>
                        E-TicaretAPIDb";

            await SendMailAsync(to,"Reset Password Request", mail);
        }

        public async Task SendCompletedOrderMailAsync(string to, string orderCode, DateTime orderDate, string userSurname)
        {
            string mail = $"Hello dear {userSurname}. <br> Your order with code {orderCode}, placed on {orderDate}, has been shipped";

            await SendMailAsync(to, $"Your order with code {orderCode}",mail);
        }
    }
}
