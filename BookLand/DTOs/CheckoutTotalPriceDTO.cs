namespace BookLand.DTOs
{
    public class CheckoutTotalPriceDTO
    {
        public decimal? TotalAmount { get; set; }

        public decimal? CouponDiscount { get; set; }

        public decimal? FinalPrice { get; set; }
    }
}
