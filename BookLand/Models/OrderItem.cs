using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class OrderItem
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? BookId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public string? Format { get; set; }

    public virtual Book? Book { get; set; }

    public virtual Order? Order { get; set; }
}
