using EstateFlow.DTOs;
using EstateFlow.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EstateFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        // get all properties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponsePropertyDto>>> GetAllProperties()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return Ok(properties);
        }

        // get property by Id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ResponsePropertyDto>> GetPropertyById(int id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
                return NotFound(new { Message = $"Property with ID {id} not found." });

            return Ok(property);
        }

        // create new property
        [HttpPost]
        public async Task<ActionResult<ResponsePropertyDto>> AddNewProperty([FromForm] CreatePropertyDto dto)
        {
            var createdProperty = await _propertyService.AddNewPropertyAsync(dto);
            return CreatedAtAction(nameof(GetPropertyById), new { id = createdProperty.Id }, createdProperty);
        }

        // update property details
        [HttpPut("{id:int}")]
        public async Task<ActionResult<ResponsePropertyDto>> UpdateProperty(int id, [FromBody] UpdatePropertyDto dto)
        {
            try
            {
                var updatedProperty = await _propertyService.UpdatePropertyAsync(dto, id);
                return Ok(updatedProperty);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        // delete single property by Id
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            try
            {
                var deleted = await _propertyService.DeletePropertyAsync(id);
                if (!deleted)
                    return NotFound(new { Message = $"Property with ID {id} not found or could not be deleted." });

                return NoContent(); //  No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // update property status / reject or approved
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest("Invalid status.");

            var success = await _propertyService.UpdatePropertyStatusAsync(id, dto.Status);
            if (!success)
                return NotFound("Property not found.");

            return Ok(new { message = "Status updated." });
        }
    }
}
