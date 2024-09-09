using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class UserDetail
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? ProfessionalTitle { get; set; }

    public string? Languages { get; set; }

    public int? Age { get; set; }

    public string? Description { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

    public string? Postcode { get; set; }

    public virtual User? User { get; set; }
}
