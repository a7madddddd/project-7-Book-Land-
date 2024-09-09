using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }
}
