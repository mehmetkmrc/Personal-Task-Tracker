namespace PersonalTaskTracker.Api.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }

        public TaskStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public int OwnerId { get; set; }
        public User Owner { get; set; }

        public int CreatedById { get; set; }
        public User CreatedBy { get; set; }
    }

    public enum TaskStatus
    {
        Bekliyor = 0,
        DevamEdiyor = 1,
        Tamamlandi = 2
    }
}
