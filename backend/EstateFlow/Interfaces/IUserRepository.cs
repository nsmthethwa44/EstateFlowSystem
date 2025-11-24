using EstateFlow.Entities;

namespace EstateFlow.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> getUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<IEnumerable<User>> GetAllUsersAsync(); // for admin
        Task<User?> GetByIdAsync(int id);
        Task<bool> UpdateAsync(User user);

        // for agents
        // getting the agents propeties using the logged-in user or agent id
        Task<IEnumerable<Property>> GetMyPropertiesAsync(int id);
    }
}
