using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftServe.ITA.PrompterPro.Domain.Models
{
    public class Reader : BaseModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }

        public int? LastScriptId { get; set; }
        public Script LastScript { get; set; }
    }
}
