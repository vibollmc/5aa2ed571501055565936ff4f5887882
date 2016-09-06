namespace Hotel.Domain.Data
{
    public class RoomType : MongoEntity
    {
        public string Name { get; set; }
        public string FormulaByDay { get; set; }
        public string FormulaByHour { get; set; }
        public string FormulaByHalfDay { get; set; }
    }
}
