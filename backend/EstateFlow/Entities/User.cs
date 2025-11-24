namespace EstateFlow.Entities
{
   public class User
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty ;
        public string PasswordHash { get; set; } = string.Empty ;
        public string Role { get; set; } = string.Empty;  // "Admin" | "Agent" | "Buyer"
        public string? ImageUrl { get; set; } // Store image directly
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Agents Only
        public string? PhoneNumber { get; set; }
        public string? OfficeAddress { get; set; }

        // Navigation
        public List<Property> Properties { get; set; } = new();
        public List<PropertyReview> Reviews { get; set; } = new();
    }

}
