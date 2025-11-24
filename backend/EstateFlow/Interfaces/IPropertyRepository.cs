using EstateFlow.Entities;
using System.Collections;

namespace EstateFlow.Interfaces
{
    public interface IPropertyRepository
    {
        // get all properties
        IQueryable<Property> GetAllPropertiesAsync();

        // add new properies
        Task AddNewPropertyAsync(Property property);

        // get property by id
        Task<Property?> GetPropertyByIdAsync(int id);

        // delete property by id
        Task<bool> DeletePropertyAsync(Property property);

        // update property
        Task UpdatePropertyAsync(Property property);

        // the short prayer i just did hoping this method works
        // getting the summery report or stat

        //for admin == we dont need if of course
        Task<int> GetTotalListingsAsync();
        Task<int> GetTotalOffersAsync();
        Task<int> GetPendingApprovalListingsAsync();

        // for logged-in agent
        Task<int> GetAgentListingsAsync(int agentId);
        Task<int> GetAgentOffersAsync(int agentId);
        Task<int> GetAgentPendingListingsAsync(int agentId);

        //for logged-in buyers
        Task<int> GetBuyerOffersAsync(int buyerId);
    }
}
