namespace PersonalTaskTracker.Api.Models
{
    public class TaskComment
    {
        public int Id { get; set; }

        // Foreign key to Task
        public int TaskId { get; set; }
        public Task Task { get; set; }

        // Foreign key to User (comment author)
        public int UserId { get; set; }
        public User User { get; set; }

        public string CommentText { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
