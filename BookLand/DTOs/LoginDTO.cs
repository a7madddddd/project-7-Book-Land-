using System.ComponentModel.DataAnnotations;

namespace BookLand.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "please enter your email")]
        [EmailAddress(ErrorMessage = "please enter a valid email")]
        public string Email { get; set; }



        [Required(ErrorMessage = "please enter your password")]
        [DataType(DataType.Password)]
        //[StringLength(50, MinimumLength = 8, ErrorMessage = "password should be between 8 and 50 ")]
        //[RegularExpression(@"^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9A-Za-z]).*$",
        //    ErrorMessage = "password must have 1 capital letter, 1 small letter, 1 number and 1 symbol")]
        public string Password { get; set; }
    }
}
