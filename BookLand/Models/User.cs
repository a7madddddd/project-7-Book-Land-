using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Image { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public int? Points { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<CommentsReview> CommentsReviews { get; set; } = new List<CommentsReview>();

    public virtual ICollection<Library> Libraries { get; set; } = new List<Library>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<PointsLoyalty> PointsLoyalties { get; set; } = new List<PointsLoyalty>();

    public virtual UserDetail? UserDetail { get; set; }

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
