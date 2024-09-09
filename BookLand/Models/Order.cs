using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public decimal? TotalAmount { get; set; }

    public string? Status { get; set; }

    public string? TransactionId { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User? User { get; set; }
}
