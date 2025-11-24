using EstateFlow.DTOs;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EstateFlow.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        // register new user
        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _repo.getUserByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exist"); // return error if user exits
            }

            // new user entity
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };
            await _repo.AddUserAsync(user);
            return GenerateJwtToken(user);
        }

        // user login
        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _repo.getUserByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("Invalid email or password"); // if user entered incorrect details return error msg

            return GenerateJwtToken(user); // or login user and generate new token
        }

        // create a user response token claims (name, email, role)
        // after logining return the claimed user token details
        public AuthResponseDto GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("ImageUrl", user.ImageUrl ?? string.Empty)
        };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            return new AuthResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                ImageUrl = user.ImageUrl ?? string.Empty
            };
        }
    }
    }
