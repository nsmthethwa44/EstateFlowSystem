using EstateFlow.Entities;
using EstateFlow.DTOs;

namespace EstateFlow.Interfaces
{
    public interface IOfferService
    {
        Task<OfferDto> CreateOfferAsync(int buyerId, CreateOfferDto dto);
        Task<List<OfferDto>> GetBuyerOffersAsync(int buyerId);
        Task<List<OfferDto>> GetAgentPropertyOffersAsync(int agentId);
        Task<List<OfferDto>> GetAllOffersAsync();
        Task<OfferDto?> GetOfferByIdAsync(int offerId);
        Task<bool> UpdateOfferStatusAsync(int offerId, string status);
        Task<bool> DeleteOfferAsync(int id);
    }

}
