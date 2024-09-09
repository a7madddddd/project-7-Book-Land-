namespace Project_7.DTO
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
        Task SendEmailAsync(string to, string subject, string body);

    }
}
