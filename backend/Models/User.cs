namespace PersonalTaskTracker.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProjectUser> ProjectUsers { get; set; }
        public ICollection<Task> OwnedTasks { get; set; }
        public ICollection<Task> CreatedTasks { get; set; }
    }
}
