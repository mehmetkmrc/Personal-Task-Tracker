namespace PersonalTaskTracker.Api.DTOs
{
    public class TaskCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int ProjectId { get; set; }
        public int OwnerId { get; set; }
        public int CreatedById { get; set; }
    }
}
