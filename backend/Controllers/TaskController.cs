using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using PersonalTaskTracker.Api.Data;
using PersonalTaskTracker.Api.DTOs;
using PersonalTaskTracker.Api.Models;

namespace PersonalTaskTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/task
        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] int? projectId, [FromQuery] List<Models.TaskStatus> status,  [FromQuery] int? userId, 
            [FromQuery] DateTime? startDate, 
            [FromQuery] DateTime? endDate, [FromQuery] DateTime? dueDate, [FromQuery] bool? isDaily)
        {
            var query = _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.Owner)
                .Include(t => t.CreatedBy)
                .AsQueryable();

            if (projectId.HasValue)
                query = query.Where(t => t.ProjectId == projectId.Value);

            if (status != null && status.Count > 0)
                query = query.Where(t => status.Contains(t.Status));

            if (userId.HasValue)
                query = query.Where(t => t.CreatedById == userId.Value);
            if (startDate.HasValue)
                query = query.Where(t => t.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(t => t.CreatedAt <= endDate.Value.AddDays(1).AddTicks(-1)); // End date inclusive

            if (dueDate.HasValue)
                query = query.Where(t => t.DueDate == dueDate.Value.Date);
            if (isDaily.HasValue)
                query = query.Where(t => t.IsDaily == isDaily.Value); // IsDailyTask filtresi


            var tasks = await query
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status,
                    ProjectId = t.ProjectId,
                    ProjectName = t.Project.Name, // Sadece gerekli veriyi al
                    OwnerId = t.OwnerId,
                    OwnerName = t.Owner.Name, // Sadece gerekli veriyi al
                    CreatedById = t.CreatedById,
                    CreatedByName = t.CreatedBy.Name, // Sadece gerekli veriyi al
                    IsDaily = t.IsDaily
                })
                .ToListAsync();

            return Ok(tasks);
        }

        // GET: api/task/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.Owner)
                .Include(t => t.CreatedBy)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status,
                    ProjectId = t.ProjectId,
                    ProjectName = t.Project.Name,
                    OwnerId = t.OwnerId,
                    OwnerName = t.Owner.Name,
                    CreatedById = t.CreatedById,
                    CreatedByName = t.CreatedBy.Name,
                    IsDaily = t.IsDaily
                })
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null) return NotFound();

            return Ok(task);
        }

        // POST: api/task
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto dto)
        {
            var task = new Models.Task
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                Status = dto.Status,
                ProjectId = dto.ProjectId,
                OwnerId = dto.OwnerId,
                CreatedById = dto.CreatedById,
                IsDaily = false
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/task/{id}/due-date
        [HttpPut("{id}/due-date")]
        public async Task<IActionResult> UpdateTaskDueDate(int id, [FromBody] UpdateDueDateDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound("Görev bulunamadı.");
            }

            task.DueDate = dto.DueDate;
            task.IsDaily = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/task/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound("Görev bulunamadı.");
            }

            task.Status = dto.Status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
