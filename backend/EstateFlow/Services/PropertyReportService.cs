using EstateFlow.DTOs;
using EstateFlow.Interfaces;

namespace EstateFlow.Services
{
        public class PropertyReportService : IPropertyReportService
        {
            private readonly IPropertyRepository _repo;

            public PropertyReportService(IPropertyRepository repo)
            {
                _repo = repo;
            }

            // admin stats repor summary
            public async Task<AdminReportDto> GetAdminSummaryAsync()
            {
                return new AdminReportDto
                {
                    TotalListings = await _repo.GetTotalListingsAsync(),
                    TotalOffers = await _repo.GetTotalOffersAsync(),
                    PendingApproval = await _repo.GetPendingApprovalListingsAsync()
                };
            }

            // agent stats summary here
            public async Task<AgentReportDto> GetAgentSummaryAsync(int agentId)
            {
                return new AgentReportDto
                {
                    Listings = await _repo.GetAgentListingsAsync(agentId),
                    Offers = await _repo.GetAgentOffersAsync(agentId),
                    Pending = await _repo.GetAgentPendingListingsAsync(agentId)
                };
            }

            // buyer stats summary
            public async Task<BuyerReportDto> GetBuyerSummaryAsync(int buyerId)
            {
                return new BuyerReportDto
                {
                    OffersMade = await _repo.GetBuyerOffersAsync(buyerId)
                };
            }
        }
}
