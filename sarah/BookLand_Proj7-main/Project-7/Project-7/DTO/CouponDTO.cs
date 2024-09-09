namespace Project_7.DTO
{
    public class CouponDTO
    {
        public string? Name { get; set; }
        public decimal? DiscountAmount { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public string? Status { get; set; }
    }
}
