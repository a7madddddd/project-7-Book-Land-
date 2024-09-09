using Project_7.Models;

namespace Project_7.DTO
{
    public class ChatRequestDTO
    {
        public int ChatId { get; set; }

        public int? UserId { get; set; }

        public virtual UserDTO User { get; set; }

    }

    public class UserDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

    }

}
