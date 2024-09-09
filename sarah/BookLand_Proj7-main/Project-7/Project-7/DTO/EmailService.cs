using System.Net.Mail;
using System.Net;

namespace Project_7.DTO
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient(_config["SMTP:Host"])
            {
                Port = int.Parse(_config["SMTP:Port"]),
                Credentials = new NetworkCredential(_config["SMTP:Username"], _config["SMTP:Password"]),
                EnableSsl = true,
            };

            smtpClient.Send(_config["SMTP:FromAddress"], to, subject, body);
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient(_config["SMTP:Host"])
            {
                Port = int.Parse(_config["SMTP:Port"]),
                Credentials = new NetworkCredential(_config["SMTP:Username"], _config["SMTP:Password"]),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage(_config["SMTP:FromAddress"], to, subject, body);

            await smtpClient.SendMailAsync(mailMessage);  // Use the async method
        }
    }
}
