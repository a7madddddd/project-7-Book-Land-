using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class CartItem
{
    public int Id { get; set; }

    public int? CartId { get; set; }

    public int? BookId { get; set; }

    public int? Quantity { get; set; }

    public string? Format { get; set; }

    public decimal? Price { get; set; }

    public virtual Book? Book { get; set; }

    public virtual Cart? Cart { get; set; }
}
