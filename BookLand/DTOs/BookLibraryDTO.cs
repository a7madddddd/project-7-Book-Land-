namespace BookLand.DTOs
{
    public class BookLibraryDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? Format { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
