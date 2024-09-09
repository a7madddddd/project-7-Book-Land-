using System.ComponentModel.DataAnnotations;

namespace Project_7.DTO
{
    public class ResetPasswordDTO
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Otp { get; set; }

        [Required]
        public string? NewPassword { get; set; }
    }
}
