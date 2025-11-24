using EstateFlow.Data;
using EstateFlow.Interfaces;
using Microsoft.EntityFrameworkCore;
using EstateFlow.Entities;
using Microsoft.AspNetCore.Http.HttpResults;

namespace EstateFlow.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _db;
        public PropertyRepository(AppDbContext db) { 
            _db = db;
        }

        // get all properties 
        public  IQueryable<Property> GetAllPropertiesAsync()
        {
             return _db.Properties.Include(c => c.Agent);    
        }

        // create new property
        public async Task AddNewPropertyAsync(Property property)
        {
            await _db.Properties.AddAsync(property); 
            await _db.SaveChangesAsync();
        }

        // search property by id
        public async Task<Property?> GetPropertyByIdAsync(int id) => await _db.Properties.FindAsync(id);

        // delete property
        public async Task<bool> DeletePropertyAsync(Property property)
        {
            _db.Properties.Remove(property);
            var  results = await _db.SaveChangesAsync();
            return results > 0;
        }

        // update property
        public async Task UpdatePropertyAsync(Property property)
        {
            _db.Properties.Update(property);
          await _db.SaveChangesAsync();
        }

        // getting all stats report summary for ADMIN
        public async Task<int> GetTotalListingsAsync()
        => await _db.Properties.CountAsync(); // count all properties

        public async Task<int> GetTotalOffersAsync()
            => await _db.Offers.CountAsync(); // count offers

        public async Task<int> GetPendingApprovalListingsAsync()
            => await _db.Properties.CountAsync(p => p.Status == "Pending"); // count pending properties


        // this is simple for a logged-in agent
        public async Task<int> GetAgentListingsAsync(int agentId)
       => await _db.Properties.CountAsync(p => p.AgentId == agentId);  // count agent listing

        public async Task<int> GetAgentOffersAsync(int agentId)
            => await _db.Offers.CountAsync(o => o.Property.AgentId == agentId); // count offers rceived

        public async Task<int> GetAgentPendingListingsAsync(int agentId)
            => await _db.Properties.CountAsync(p => p.AgentId == agentId && p.Status == "Pending"); // count still waiting approval


        // stats for a logged-in buyer
        public async Task<int> GetBuyerOffersAsync(int buyerId)
        => await _db.Offers.CountAsync(o => o.BuyerId == buyerId);
    }
}
