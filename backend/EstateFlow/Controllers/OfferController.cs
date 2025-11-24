using EstateFlow.DTOs;
using EstateFlow.Interfaces;
using EstateFlow.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EstateFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _offerService;

        public OfferController(IOfferService offerService)
        {
            _offerService = offerService;
        }

        // Buyer creates an offer
        [HttpPost]
        public async Task<IActionResult> CreateOffer([FromBody] CreateOfferDto dto)
        {
            var buyerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var offer = await _offerService.CreateOfferAsync(buyerId, dto);
            return Ok(offer);
        }

        // Logged-in buyer gets their offers
        [HttpGet("my-offers")]
        public async Task<IActionResult> GetBuyerOffers()
        {
            try
            {
                var buyerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var offers = await _offerService.GetBuyerOffersAsync(buyerId);
                return Ok(offers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error occurred while retrieving offers", error = ex.Message });
            }
        }

        // Agent gets offers on their properties
        [HttpGet("agent")]
        public async Task<IActionResult> GetAgentPropertyOffers()
        {
            var agentId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var offers = await _offerService.GetAgentPropertyOffersAsync(agentId);
            return Ok(offers);
        }

        // Admin gets all offers
        [HttpGet("admin")]
        public async Task<IActionResult> GetAllOffers()
        {
            var offers = await _offerService.GetAllOffersAsync();
            return Ok(offers);
        }

        // Update offer status (agent/admin)
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOfferStatus(int id, [FromBody] UpdateOfferStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest(new { message = "Status is required." });

            var success = await _offerService.UpdateOfferStatusAsync(id, dto.Status);
            if (!success)
                return NotFound(new { message = "Offer not found." });
            return Ok(new { message = "Offer status updated successfully." });
        }


        // delete offer
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {
            try
            {
                var deleted = await _offerService.DeleteOfferAsync(id);
                if (!deleted)
                    return NotFound(new { Message = $"Offer with ID {id} not found or could not be deleted." });

                return NoContent(); //  No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
