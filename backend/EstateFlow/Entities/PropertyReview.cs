namespace EstateFlow.Entities
{
    public class PropertyReview
    {
        public int Id { get; set; }
        public int Rating { get; set; } // 1-5
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // FK to Property
        public int PropertyId { get; set; }
        public Property? Property { get; set; } 

        // FK to User (Buyer)
        public int UserId { get; set; }
        public User? User { get; set; }
    }

}
