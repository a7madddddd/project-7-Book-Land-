namespace BookLand.DTOs
{
    public class OrderDTO
    {
        public int? UserId { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? Status { get; set; }

        public string? TransactionId { get; set; }
    }
}
