using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class Library
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? BookId { get; set; }

    public string? Format { get; set; }

    public virtual Book? Book { get; set; }

    public virtual User? User { get; set; }
}
