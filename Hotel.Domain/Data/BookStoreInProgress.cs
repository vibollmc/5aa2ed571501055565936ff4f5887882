using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Data
{
    public class BookStoreInProgress : MongoEntity
    {
        public Room Room { get; set; }
        public Customer Customer { get; set; }

        public DateTime DateBookIn { get; set; }
        public DateTime DateCheckIn { get; set; }
        public DateTime DateCheckOut { get; set; }

        public List<OtherService> OtherService { get; set; }

    }
}
