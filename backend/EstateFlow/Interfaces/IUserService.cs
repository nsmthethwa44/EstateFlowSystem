using EstateFlow.DTOs;
using EstateFlow.Entities;
namespace EstateFlow.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync(); // for admin getting all users
        Task<User> UpdateUserAsync(int userId, UpdateUserDto dto);

        // for agents
        // getting the agents propeties using the logged-in user or agent id
        Task<IEnumerable<ResponsePropertyDto>> GetMyPropertiesAsync(int id);
    }

}
