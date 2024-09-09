using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Chat
{
    public int ChatId { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();

    public virtual User? User { get; set; }
}
