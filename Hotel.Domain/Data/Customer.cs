namespace Hotel.Domain.Data
{
    public class Customer : MongoEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Representative { get; set; }
        public string Address { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string TaxId { get; set; }
        public string IDNumber { get; set; }
    }
}
