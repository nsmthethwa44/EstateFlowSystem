using EstateFlow.Data;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;
        public UserRepository(AppDbContext db)  => _db = db;    


        // add user or register
        public async Task AddUserAsync(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();   
        }

        // search by email or login
        public async Task<User?> getUserByEmailAsync(string email)
        {
           return  await _db.Users.FirstOrDefaultAsync( x => x.Email == email);
        }

        // get all users
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _db.Users
                .OrderByDescending(u => u.Id)
                .ToListAsync();
        }

        // get user id
        public async Task<User?> GetByIdAsync(int id)
         => await _db.Users.FindAsync(id);

        //update  user propfile
        public async Task<bool> UpdateAsync(User user)
        {
            _db.Users.Update(user);
            return await _db.SaveChangesAsync() > 0;
        }

        // get agents properties using logged-in user id
        public async Task<IEnumerable<Property>> GetMyPropertiesAsync(int id)
        {
            return await _db.Properties.Where(u => u.AgentId == id).ToListAsync();
        }
    }
}
