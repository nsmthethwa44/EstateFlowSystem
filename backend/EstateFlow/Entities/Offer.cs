using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstateFlow.Entities
{
    public class Offer
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public Property? Property { get; set; }
        public int BuyerId { get; set; }
        public User? Buyer { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
  }

