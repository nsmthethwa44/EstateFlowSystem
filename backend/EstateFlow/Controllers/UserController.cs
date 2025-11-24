using EstateFlow.DTOs;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EstateFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        // get all users, retun a try-catch error when error happens 
        // or failes to get users
        [HttpGet]
        //[Authorize(Roles ="Adim")]
        public async Task<ActionResult<IEnumerable<ResponseUserDto>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error occured while getting users", details = ex.Message });
            }
        }


        //update user details, using logged-in user id
        // if not-found return error messages
        [HttpPut]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid data.");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            // Update user and get updated entity
            var updatedUser = await _userService.UpdateUserAsync(userId, dto);
            if (updatedUser == null)
                return NotFound("User not found.");

            // Generate new JWT token with updated claims
            var authResponse = _authService.GenerateJwtToken(updatedUser); // make this method public in AuthService
            return Ok(authResponse); // return new token + user data to Angular
        }


        //get logged-in user / agent properties
        [HttpGet("my-properties")]
        public async Task<IActionResult> GetMyProperties()
        {
            var agentId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(await _userService.GetMyPropertiesAsync(agentId));
        }

    }
}
