using EstateFlow.Entities;

namespace EstateFlow.DTOs
{
    public class ResponsePropertyDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double Size { get; set; } 
        public DateTime CreatedAt { get; set; }
        public string? ImageUrl { get; set; }
        public int? AgentId { get; set; }
        public string? AgentName { get; set; }
        public string? AgentImageUrl { get; set; }
    }

    public class CreatePropertyDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected, Sold
        public string Country { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double Size { get; set; } // square meters
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public IFormFile? ImageUrl { get; set; }
        public int AgentId { get; set; }
    }

    public class UpdatePropertyDto
    {
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double Size { get; set; } // square meters
        public string Status { get; set; } = "";
    }

    public class StatusUpdateDto
    {
        public string Status { get; set; } = string.Empty;
    }

    public class AdminReportDto
    {
        public int TotalListings { get; set; }
        public int TotalOffers { get; set; }
        public int PendingApproval { get; set; }
    }

    public class AgentReportDto
    {
        public int Listings { get; set; }
        public int Offers { get; set; }
        public int Pending { get; set; }
    }

    public class BuyerReportDto
    {
        public int OffersMade { get; set; }
    }

}
