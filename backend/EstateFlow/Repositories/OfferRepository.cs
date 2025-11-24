using EstateFlow.Data;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Repositories
{
    public class OfferRepository : IOfferRepository
    {
        private readonly AppDbContext _db;

        public OfferRepository(AppDbContext db)
        {
            _db = db;
        }

        // create an offer and save it
        public async Task<Offer> CreateOfferAsync(Offer offer)
        {
            _db.Offers.Add(offer);
            await _db.SaveChangesAsync();
            return offer;
        }

        // get offers by buyer Id and include property where buyer id is == true
        public async Task<List<Offer>> GetOffersByBuyerAsync(int buyerId)
        {
            return await _db.Offers
                .Include(o => o.Property)
                 .Include(o => o.Buyer)
                .Where(o => o.BuyerId == buyerId)
                .ToListAsync();
        }

        // getting agent offers with properties includes
        public async Task<List<Offer>> GetOffersByAgentAsync(int agentId)
        {
            return await _db.Offers
                .Include(o => o.Property)
                .Include(o => o.Buyer)
                .Where(o => o.Property.AgentId == agentId)
                .ToListAsync();
        }


        // or just get all offers for admin here, IDs not needed
        public async Task<IEnumerable<Offer>> GetAllOffersAsync()
        {
            return await _db.Offers
                .Include(o => o.Property)
                .Include(o => o.Buyer)
                .ToListAsync();
        }


        // i might want to view offer details
        public async Task<Offer?> GetOfferByIdAsync(int id)
        {
            return await _db.Offers
                .Include(o => o.Property)
                .Include(o => o.Buyer)
                .FirstOrDefaultAsync(o => o.Id == id);
        }



        // update offer status approve or reject
        public async Task<bool> UpdateOfferStatusAsync(Offer offer, string status)
        {
            if (offer == null) return false;
            offer.Status = status;
            _db.Offers.Update(offer);
            await _db.SaveChangesAsync();
            return true;
        }

        // delete offers 
        public async Task<bool> DeleteOfferAsync(Offer offer)
        {
            _db.Offers.Remove(offer);
            var results = await _db.SaveChangesAsync();
            return results > 0;
        }
    }

}
