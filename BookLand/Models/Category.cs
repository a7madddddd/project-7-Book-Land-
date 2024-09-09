using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
