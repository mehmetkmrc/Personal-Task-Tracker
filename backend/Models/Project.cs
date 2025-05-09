﻿namespace PersonalTaskTracker.Api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public ICollection<ProjectUser> ProjectUsers { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
