using System;
using System.Collections.Generic;

namespace BookLand.Models;

public partial class CommentsReview
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? BookId { get; set; }

    public string? CommentText { get; set; }

    public int? Rating { get; set; }

    public virtual Book? Book { get; set; }

    public virtual User? User { get; set; }
}
