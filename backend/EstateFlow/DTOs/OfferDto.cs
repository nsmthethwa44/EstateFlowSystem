namespace EstateFlow.DTOs
{

    public class OfferDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public int PropertyId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double Size { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; } = string.Empty;
        public int BuyerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? BuyerImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateOfferDto
    {
        public int PropertyId { get; set; }
        public decimal Amount { get; set; }
    }

    public class UpdateOfferStatusDto
    {
        public string Status { get; set; } = string.Empty; // Approved / Rejected
    }


}
