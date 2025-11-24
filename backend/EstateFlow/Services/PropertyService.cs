using EstateFlow.DTOs;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EstateFlow.Services
{
    // before we begin: recite prayer our father / because i might not ever remember 
    // what the hell i'm doing here, hopefull it works
    // its gonna look messy ⚽
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _repo;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PropertyService(IPropertyRepository repo, IHttpContextAccessor httpContextAccessor) {  
            _repo = repo;
            _httpContextAccessor = httpContextAccessor;
        }

        // update  property status
        public async Task<bool> UpdatePropertyStatusAsync(int id, string newStatus)
        {
            var property = await _repo.GetPropertyByIdAsync(id); // search property before updating
            if (property == null) return false; // if not found retun nothing == false

            property.Status = newStatus; // if found set status == new status
            await _repo.UpdatePropertyAsync(property); // update status and
            return true; // return something that is true since we have bool
        }

        // create new property
        // return the created property details
        public async Task<ResponsePropertyDto> AddNewPropertyAsync(CreatePropertyDto dto)
        {
            // Get the logged-in Agent's ID from claims
            var agentIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier); // logged-in user ID here
            if (agentIdClaim == null) // if user ID not found throw an error == warning to login of not
                throw new UnauthorizedAccessException("You must be logged in as an agent to add a property.");

            var agentId = int.Parse(agentIdClaim.Value);

            // since i have properties, users need images, so here im handling image upload
            string? imageUrl = null;
            if (dto.ImageUrl != null && dto.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads"); // image path created
                if (!Directory.Exists(uploadsFolder)) // if image path or folder is not created, 
                    Directory.CreateDirectory(uploadsFolder); // im gonna create a folder path or directry

                // now im creating a new image identifier and storing image 
                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ImageUrl.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageUrl.CopyToAsync(stream);
                }
                imageUrl = $"/uploads/{uniqueFileName}"; // new mage finally created and stored inside created folder
            }

            // a new property is created here, Map to entity, 
            var property = new Property
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                Address = dto.Address,
                City = dto.City,
                Province = dto.Province,
                Country = dto.Country,
                Status = dto.Status,
                Bedrooms = dto.Bedrooms,
                Bathrooms = dto.Bathrooms,
                Size = dto.Size,
                AgentId = agentId, // use logged-in agent's ID
                ImageUrl = imageUrl, // the uploaded image
                CreatedAt = DateTime.UtcNow // new date property was created
            };
            await _repo.AddNewPropertyAsync(property); // adding property

            //this is what is expeted form the frontend, a DTO, Map to response DTO
            return new ResponsePropertyDto
            {
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Price = property.Price,
                Address = property.Address,
                City = property.City,
                Province = property.Province,
                Country = property.Country,
                Status = property.Status,
                Bedrooms = property.Bedrooms,
                Bathrooms = property.Bathrooms,
                Size = property.Size,
                CreatedAt = property.CreatedAt,
                ImageUrl = property.ImageUrl,
                AgentId = property.AgentId
            };
        }


        // get all properties, Order by Id.
        // now im trying to get all properties and order them by recent id
        public async Task<IEnumerable<ResponsePropertyDto>> GetAllPropertiesAsync() 
        {
           var properties = await _repo.GetAllPropertiesAsync()
                .OrderByDescending(p => p.Id) // here the magic happens ORDER by ID
               .ToListAsync();

            // and return the good stuff happens, mapped the backend response to a DTO
            return properties.Select(p => new ResponsePropertyDto {
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
  

        // OK, I  might want to get the property details or search it by ID
        // property by id
        public async Task<ResponsePropertyDto?> GetPropertyByIdAsync(int id)
        {
            var property = await _repo.GetPropertyByIdAsync(id); // search property by id
            return property == null ? null : new ResponsePropertyDto // if not found return nothing or return the property as mapped DTO
            { // this is what user gets on the frontend
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Price = property.Price,
                Address = property.Address,
                 City = property.City,
                 Province = property.Province,
                 Status = property.Status,
                 Country = property.Country,
                 Bedrooms = property.Bedrooms,
                 Bathrooms = property.Bathrooms,
                 Size = property.Size,
                 CreatedAt = property.CreatedAt,
                 ImageUrl = property.ImageUrl,
                 AgentId = property.AgentId,
                 AgentName = property.Agent?.Name,
                 AgentImageUrl = property.Agent?.ImageUrl,
            };
        }

        // i might want to delete the property, soo
        // First, fetch the property by ID, like  == search it
        public async Task<bool> DeletePropertyAsync(int id)
        {
            var property = await _repo.GetPropertyByIdAsync(id); // here im searching by id
            if (property == null) // if i dont get the property, then
                return false; //  retun Nothing to delete == false

            // Then delete it using the repository method
            var result = await _repo.DeletePropertyAsync(property);
            return result; // this is true, property deleted now
        }

        //  i might want to the update property, but first
        public async Task<ResponsePropertyDto> UpdatePropertyAsync(UpdatePropertyDto dto, int id)
        {
            var property = await _repo.GetPropertyByIdAsync(id); // we search it buy ID
            if (property == null) // if we dont found it, return nothing
                throw new KeyNotFoundException($"Property with ID {id} not found."); // or throw the magic words at the user == error message

            // id property exit, update the following
            property.Description = dto.Description;
            property.Price = dto.Price;
            property.Address = dto.Address;
            property.City = dto.City;
            property.Province = dto.Province;
            property.Country = dto.Country;
            property.Bedrooms = dto.Bedrooms;
            property.Bathrooms = dto.Bathrooms;
            property.Size = dto.Size;

            await _repo.UpdatePropertyAsync(property);

            return new ResponsePropertyDto
            {
                Id = property.Id,
                Description = property.Description,
                Price = property.Price,
                Address = property.Address,
                City = property.City,
                Province = property.Province,
                Country = property.Country,
                Bedrooms = property.Bedrooms,
                Bathrooms = property.Bathrooms,
                Size = property.Size
            };
        }

    }

}
