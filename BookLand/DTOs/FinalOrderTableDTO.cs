namespace BookLand.DTOs
{
    public class FinalOrderTableDTO
    {
        public decimal? Price { get; set; }

        public int? Quantity { get; set; }

        public string? Format { get; set; }

        public BookInfo pi { get; set; }


    }


    public class BookInfo
    {
        public string? Title { get; set; }

        public string? ImageUrl { get; set; }
    }
}
