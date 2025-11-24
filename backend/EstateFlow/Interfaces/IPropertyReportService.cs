using EstateFlow.DTOs;

namespace EstateFlow.Interfaces
{
    public interface IPropertyReportService
    {
        // admin stats report
        Task<AdminReportDto> GetAdminSummaryAsync();

        // agent stats report
        Task<AgentReportDto> GetAgentSummaryAsync(int agentId);

        // and logged-in buyer stats
        Task<BuyerReportDto> GetBuyerSummaryAsync(int buyerId);
    }
}
