using EstateFlow.DTOs;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
        }

        // get all users / this is for admin roles
        // map all user details, using Dto
        public async Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync()
        {
            var users = await _repo.GetAllUsersAsync();

            return users.Select(u => new ResponseUserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role, 
                ImageUrl = u.ImageUrl,
                CreatedAt = u.CreatedAt
            });
        }

        // updating user details.
        // a logged-in user must update profile after logged-in
        //public async Task<User> UpdateUserAsync(int userId, UpdateUserDto dto)
        //{
        //    var user = await _repo.GetByIdAsync(userId);
        //    if (user == null) return false;

        //    if (dto.ImageFile != null)
        //    {
        //        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
        //        if (!Directory.Exists(uploadsFolder))
        //            Directory.CreateDirectory(uploadsFolder);

        //        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageFile.FileName)}";
        //        var filePath = Path.Combine(uploadsFolder, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await dto.ImageFile.CopyToAsync(stream);
        //        }
        //        user.ImageUrl = $"/uploads/{fileName}";
        //    }

        //    user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;
        //    user.OfficeAddress = dto.OfficeAddress ?? user.OfficeAddress;

        //    return await _repo.UpdateAsync(user);
        //}

        public async Task<User> UpdateUserAsync(int userId, UpdateUserDto dto)
        {
            var user = await _repo.GetByIdAsync(userId);
            if (user == null) return null;

            if (dto.ImageFile != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageFile.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageFile.CopyToAsync(stream);
                }
                user.ImageUrl = $"/uploads/{fileName}";
            }

            user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;
            user.OfficeAddress = dto.OfficeAddress ?? user.OfficeAddress;

            var saved = await _repo.UpdateAsync(user);
            return saved ? user : null; // return updated user instead of bool
        }


        // getting logged-in user / a
        public async Task<IEnumerable<ResponsePropertyDto>> GetMyPropertiesAsync(int id)
        {
            var properties = await _repo.GetMyPropertiesAsync(id);
            return properties.Select(p => new ResponsePropertyDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Address = p.Address,
                City = p.City,
                Province = p.Province,
                Status = p.Status,
                Country = p.Country,
                Bedrooms = p.Bedrooms,
                Bathrooms = p.Bathrooms,
                Size = p.Size,
                CreatedAt = p.CreatedAt,
                ImageUrl = p.ImageUrl,
                AgentId = p.AgentId,
                AgentName = p.Agent?.Name,
                AgentImageUrl = p.Agent?.ImageUrl,
            });
        }

 

    }

}
