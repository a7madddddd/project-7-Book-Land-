using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }
}
