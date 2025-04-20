using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalTaskTracker.Api.Data;
using PersonalTaskTracker.Api.DTOs;

namespace PersonalTaskTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/project/by-user?userId=1
        [HttpGet("by-user")]
        public async Task<IActionResult> GetProjectsByUserId([FromQuery] int userId)
        {
            var projects = await _context.ProjectUsers
                .Where(pu => pu.UserId == userId)
                .Include(pu => pu.Project)
                .Select(pu => new ProjectResponseDto
                {
                    ProjectId = pu.ProjectId,
                    ProjectName = pu.Project.Name
                })
                .ToListAsync();

            if (!projects.Any())
            {
                return NotFound("Bu kullanıcıya ait proje bulunamadı.");
            }

            return Ok(projects);
        }
    }
}
