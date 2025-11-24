using EstateFlow.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EstateFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IPropertyReportService _service;
        public ReportController(IPropertyReportService service)
        {
            _service = service;
        }

        // get all admin summary report 
        [HttpGet("admin-summary")]
        public async Task<IActionResult> GetAdminSummary()
        {
            var summary = await _service.GetAdminSummaryAsync();
            return Ok(summary);
        }

        // get all agent summary report
        [HttpGet("agent-summary")]
        public async Task<IActionResult> GetAgentSummary()
        {
            var agentId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var summary = await _service.GetAgentSummaryAsync(agentId);
            return Ok(summary);
        }

        // get all buyer report summary
        [HttpGet("buyer-summary")]
        public async Task<IActionResult> GetBuyerSummary()
        {
            var buyerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var summary = await _service.GetBuyerSummaryAsync(buyerId);
            return Ok(summary);
        }
    }
}
