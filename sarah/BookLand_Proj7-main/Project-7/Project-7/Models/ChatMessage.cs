using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project_7.Models;

public partial class ChatMessage
{
    public int ChatMessagesId { get; set; }

    public int ChatId { get; set; }

    public string? Cmessages { get; set; }

    public int? Flag { get; set; }

    [JsonIgnore] // تجاهل العلاقة العكسية لمنع حدوث "لوب"
    public virtual Chat? Chat { get; set; }
}


//public partial class ChatMessage
//{
//    public int ChatMessagesId { get; set; }

//    public int? ChatId { get; set; }

//    public string? Cmessages { get; set; }

//    public int? Flag { get; set; }

//    public virtual Chat? Chat { get; set; }
//}
