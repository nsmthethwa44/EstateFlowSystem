using EstateFlow.DTOs;
using EstateFlow.Entities;
using EstateFlow.Interfaces;
using System;

namespace EstateFlow.Services
{
    public class OfferService : IOfferService
    {
        private readonly IOfferRepository _repo;

        public OfferService(IOfferRepository repo)
        {
            _repo = repo;
        }

        // help me GOD i remember what i even doing here, anyway 
        // create an offer here and map offer reponse
        public async Task<OfferDto> CreateOfferAsync(int buyerId, CreateOfferDto dto)
        {
            var offer = new Offer
            {
                BuyerId = buyerId,
                PropertyId = dto.PropertyId,
                Amount = dto.Amount,
                Status = "Pending"
            };

            var created = await _repo.CreateOfferAsync(offer);
            var o = await _repo.GetOfferByIdAsync(created.Id);
            return new OfferDto
            {
                Id = o.Id,
                Amount = o.Amount,
                Status = o.Status,
                PropertyId = o.Property?.Id ?? 0,
                Title = o.Property?.Title ?? "",
                Address = o.Property?.Address ?? "",
                Price = o.Property?.Price ?? 0,
                ImageUrl = o.Property?.ImageUrl ?? "",
                BuyerId = o.Buyer?.Id ?? 0,
                Name = o.Buyer?.Name ?? "",
                Email = o.Buyer?.Email ?? ""
            };
        }


        public async Task<List<OfferDto>> GetBuyerOffersAsync(int buyerId)
        {
            var offers = await _repo.GetOffersByBuyerAsync(buyerId);
            return offers.Select(o => new OfferDto
            {
                Id = o.Id,
                Amount = o.Amount,
                Status = o.Status,
                PropertyId = o.Property?.Id ?? 0,
                Title = o.Property?.Title ?? "",
                Address = o.Property?.Address ?? "",
                Bathrooms = o.Property?.Bathrooms ?? 0,
                Bedrooms = o.Property?.Bedrooms ?? 0,
                Size = o.Property?.Size ?? 0, 
                Price = o.Property?.Price ?? 0,
                ImageUrl = o.Property?.ImageUrl ?? "",
                BuyerId = o.Buyer?.Id ?? 0,
                Name = o.Buyer?.Name ?? "",
                Email = o.Buyer?.Email ?? "",
                CreatedAt = o.CreatedAt
            }).ToList();
        }


        public async Task<List<OfferDto>> GetAgentPropertyOffersAsync(int agentId)
        {
            var offers = await _repo.GetOffersByAgentAsync(agentId);

            return offers.Select(o => new OfferDto
            {
                Id = o.Id,
                Amount = o.Amount,
                Status = o.Status,
                PropertyId = o.Property?.Id ?? 0,
                Title = o.Property?.Title ?? "",
                Address = o.Property?.Address ?? "",
                Bathrooms = o.Property?.Bathrooms ?? 0,
                Bedrooms = o.Property?.Bedrooms ?? 0,
                Size = o.Property?.Size ?? 0,
                Price = o.Property?.Price ?? 0,
                ImageUrl = o.Property?.ImageUrl ?? "",
                BuyerId = o.Buyer?.Id ?? 0,
                Name = o.Buyer?.Name ?? "",
                Email = o.Buyer?.Email ?? "",
                CreatedAt = o.CreatedAt,
                BuyerImageUrl = o.Buyer?.ImageUrl ?? "",
            }).ToList();
        }


        public async Task<List<OfferDto>> GetAllOffersAsync()
        {
            var offers = await _repo.GetAllOffersAsync();

            return offers.Select(o => new OfferDto
            {
                Id = o.Id,
                Amount = o.Amount,
                Status = o.Status,
                PropertyId = o.Property?.Id ?? 0,
                Title = o.Property?.Title ?? "",
                Address = o.Property?.Address ?? "",
                Bathrooms = o.Property?.Bathrooms ?? 0,
                Bedrooms = o.Property?.Bedrooms ?? 0,
                Size = o.Property?.Size ?? 0,
                Price = o.Property?.Price ?? 0,
                ImageUrl = o.Property?.ImageUrl ?? "",
                BuyerId = o.Buyer?.Id ?? 0,
                Name = o.Buyer?.Name ?? "",
                Email = o.Buyer?.Email ?? "",
                BuyerImageUrl = o.Buyer?.ImageUrl ?? "",
                CreatedAt = o.CreatedAt
            }).ToList();
        }


        public async Task<OfferDto?> GetOfferByIdAsync(int offerId)
        {
            var o = await _repo.GetOfferByIdAsync(offerId);
            if (o == null) return null;

            return new OfferDto
            {
                Id = o.Id,
                Amount = o.Amount,
                Status = o.Status,
                PropertyId = o.Property?.Id ?? 0,
                Title = o.Property?.Title ?? "",
                Address = o.Property?.Address ?? "",
                Bathrooms = o.Property?.Bathrooms ?? 0,
                Bedrooms = o.Property?.Bedrooms ?? 0,
                Size = o.Property?.Size ?? 0,
                Price = o.Property?.Price ?? 0,
                ImageUrl = o.Property?.ImageUrl ?? "",
                BuyerId = o.Buyer?.Id ?? 0,
                Name = o.Buyer?.Name ?? "",
                Email = o.Buyer?.Email ?? "",
                 CreatedAt = o.CreatedAt,
            };
        }


        // update offer 
        public async Task<bool> UpdateOfferStatusAsync(int offerId, string status)
        {
            var offer = await _repo.GetOfferByIdAsync(offerId);
            if (offer == null) return false;

            return await _repo.UpdateOfferStatusAsync(offer, status);
        }


        // delete offer
        public async Task<bool> DeleteOfferAsync(int id)
        {
            var offer = await _repo.GetOfferByIdAsync(id); // here im searching by id
            if (offer == null) // if i dont get the property offer, then
                return false; //  retun Nothing to delete == false

            // Then delete it using the repository method
            var result = await _repo.DeleteOfferAsync(offer);
            return result; // this is true, property deleted now
        }

    }

}

