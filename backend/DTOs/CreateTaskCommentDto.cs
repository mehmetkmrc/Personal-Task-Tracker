namespace PersonalTaskTracker.Api.DTOs
{
    public class CreateTaskCommentDto
    {
        public int UserId { get; set; }
        public string CommentText { get; set; }
    }
}
