﻿    namespace BookingApi.Models.Request
{
    public class ProfileRequest
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? Photo { get; set; }
    }
}
