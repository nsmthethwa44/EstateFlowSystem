using EstateFlow.DTOs;
using EstateFlow.Entities;

namespace EstateFlow.Interfaces
{

    // create the repo interfaces
    public interface IPropertyService
    {

        // add property Interface
        Task<ResponsePropertyDto> AddNewPropertyAsync(CreatePropertyDto dto);

        // get all properties
        Task<IEnumerable<ResponsePropertyDto>> GetAllPropertiesAsync();

        // get property by id
        Task<ResponsePropertyDto?> GetPropertyByIdAsync(int id);

        // delete property by ID, i needed a bool so i can search it first before jumping on delete. Make sense == true / false there
        Task<bool> DeletePropertyAsync(int id);

        // i migth want to update the property, of course
        Task<ResponsePropertyDto> UpdatePropertyAsync(UpdatePropertyDto dto, int id);

        // update the property status, admin is gonna play with this everytime new property is created.
        Task<bool> UpdatePropertyStatusAsync(int id, string newStatus);
    }
}
