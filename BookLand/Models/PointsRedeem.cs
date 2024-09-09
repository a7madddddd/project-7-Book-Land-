using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class PointsRedeem
{
    public int Id { get; set; }

    public int? PointsAmount { get; set; }

    public int? DiscountPercentage { get; set; }

    public int? SpinningWheel { get; set; }
}
