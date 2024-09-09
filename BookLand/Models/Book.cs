using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class Book
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

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<CommentsReview> CommentsReviews { get; set; } = new List<CommentsReview>();

    public virtual ICollection<Library> Libraries { get; set; } = new List<Library>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
