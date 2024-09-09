namespace Project_7.DTO
{

    public class CommentReviewDTO
    {
        public int Id { get; set; }
        public string? CommentText { get; set; }
        public int? UserId { get; set; }
        public int? Rating { get; set; }
    }


    public class BooksDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public string? Author { get; set; }

        public string? Publisher { get; set; }

        public int? YearPublished { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? DiscountPercentage { get; set; }

        public string? ImageUrl { get; set; }

        public decimal? Rating { get; set; }

        public List<CommentReviewDTO>? CommentReviews { get; set; }

    }
}
