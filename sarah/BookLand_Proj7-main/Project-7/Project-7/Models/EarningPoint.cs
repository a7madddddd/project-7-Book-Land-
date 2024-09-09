using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class EarningPoint
{
    public int Id { get; set; }

    public int? SocialMediaShare { get; set; }

    public int? BookPurchase { get; set; }

    public int? InviteFriend { get; set; }
}
