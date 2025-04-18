namespace PersonalTaskTracker.Api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
