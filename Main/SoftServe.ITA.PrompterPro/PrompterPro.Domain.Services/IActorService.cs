using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftServe.ITA.PrompterPro.Domain.Models;

namespace SoftServe.ITA.PrompterPro.Domain.Services
{
    public interface IActorService
    {
        IEnumerable<Reader> GetAll();

        Reader Get(int id);

        void Post(Reader reader);

        void Put(int id, Reader reader);

        void Delete(int id);
    }
}
