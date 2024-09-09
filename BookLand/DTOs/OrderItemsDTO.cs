namespace BookLand.DTOs
{
    public class OrderItemsDTO
    {
        //public int? OrderId { get; set; }

        public int? BookId { get; set; }

        public int? Quantity { get; set; }

        public decimal? Price { get; set; }

        public string? Format { get; set; }
    }
}
