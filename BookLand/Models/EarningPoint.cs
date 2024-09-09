using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class EarningPoint
{
    public int Id { get; set; }

    public int? SocialMediaShare { get; set; }

    public int? BookPurchase { get; set; }

    public int? InviteFriend { get; set; }
}
