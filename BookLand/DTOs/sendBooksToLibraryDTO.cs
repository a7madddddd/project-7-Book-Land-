namespace BookLand.DTOs
{
    public class sendBooksToLibraryDTO
    {
        public int? UserId { get; set; }

        public int? BookId { get; set; }

        public string? Format { get; set; }
    }
}
