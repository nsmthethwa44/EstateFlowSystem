using EstateFlow.DTOs;
using EstateFlow.Entities;

namespace EstateFlow.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        AuthResponseDto GenerateJwtToken(User user);
    }

}
