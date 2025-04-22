namespace PersonalTaskTracker.Api.DTOs
{
    public class TaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public PersonalTaskTracker.Api.Models.TaskStatus Status { get; set; } // Doğru enum
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } // Project nesnesi yerine sadece adı
        public int OwnerId { get; set; }
        public string OwnerName { get; set; } // User nesnesi yerine sadece adı
        public int CreatedById { get; set; }
        public string CreatedByName { get; set; } // User nesnesi yerine sadece adı
        public bool IsDaily { get; set; }
    }
}
