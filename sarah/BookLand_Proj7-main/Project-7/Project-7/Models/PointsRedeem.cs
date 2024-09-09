using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class PointsRedeem
{
    public int Id { get; set; }

    public int? PointsAmount { get; set; }

    public int? DiscountPercentage { get; set; }

    public int? SpinningWheel { get; set; }
}
