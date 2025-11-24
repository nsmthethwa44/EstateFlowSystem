namespace EstateFlow.Entities
{
    public class Activity
    {
        public int Id { get; set; }
        public int ActorId { get; set; }    // user who performed action
        public string ActionType { get; set; } = string.Empty;  // e.g., "OfferCreated", "PropertyApproved"
        public string Data { get; set; } = string.Empty;    // JSON for extra context
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
