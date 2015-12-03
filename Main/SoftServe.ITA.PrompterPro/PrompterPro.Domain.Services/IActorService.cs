using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SoftServe.ITA.PrompterPro.Domain.Models;

namespace SoftServe.ITA.PrompterPro.Domain.Services
{
    public interface IActorService
    {
        IEnumerable<Reader> GetAll();

        IEnumerable<Reader> GetMany(Expression<Func<Reader, bool>> expression);

        Reader Get(Expression<Func<Reader, bool>> expression);

        void Post(Reader reader);

        void Put(Reader reader);

        void Delete(Expression<Func<Reader, bool>> expression);
    }
}
