using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalTaskTracker.Api.Data;
using PersonalTaskTracker.Api.DTOs;
using PersonalTaskTracker.Api.Models;

namespace PersonalTaskTracker.Api.Controllers
{
    [ApiController]
    [Route("api/tasks/{taskId}/comments")]
    public class TaskCommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskCommentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks/5/comments
        [HttpGet]
        public async Task<IActionResult> GetCommentsForTask(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound("Görev bulunamadı.");

            var comments = await _context.TaskComments
                .Where(c => c.TaskId == taskId)
                .Include(c => c.User)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new TaskCommentDto
                {
                    Id = c.Id,
                    TaskId = c.TaskId,
                    UserId = c.UserId,
                    UserName = c.User.Name,
                    CommentText = c.CommentText,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();

            return Ok(comments);
        }

        // POST: api/tasks/5/comments
        [HttpPost]
        public async Task<IActionResult> AddCommentToTask(int taskId, [FromBody] CreateTaskCommentDto dto)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound("Görev bulunamadı.");

            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                return BadRequest("Geçersiz kullanıcı.");

            var comment = new TaskComment
            {
                TaskId = taskId,
                UserId = dto.UserId,
                CommentText = dto.CommentText,
                CreatedAt = DateTime.UtcNow
            };

            _context.TaskComments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                comment.Id,
                comment.TaskId,
                comment.UserId,
                UserName = user.Name,
                comment.CommentText,
                comment.CreatedAt
            });
        }
    }
}
