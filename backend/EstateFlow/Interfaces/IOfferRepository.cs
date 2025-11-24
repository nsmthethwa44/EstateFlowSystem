using EstateFlow.Entities;

namespace EstateFlow.Interfaces
{
        public interface IOfferRepository
        {
            Task<Offer> CreateOfferAsync(Offer offer);
            Task<List<Offer>> GetOffersByBuyerAsync(int buyerId);
            Task<List<Offer>> GetOffersByAgentAsync(int agentId);
            Task<IEnumerable<Offer>> GetAllOffersAsync();
            Task<Offer?> GetOfferByIdAsync(int id);
            Task<bool> UpdateOfferStatusAsync(Offer offer, string status);
            Task<bool> DeleteOfferAsync(Offer offer);
    }
}
