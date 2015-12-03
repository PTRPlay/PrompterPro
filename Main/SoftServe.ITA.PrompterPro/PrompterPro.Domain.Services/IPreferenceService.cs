using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SoftServe.ITA.PrompterPro.Domain.Models;

namespace SoftServe.ITA.PrompterPro.Domain.Services
{
    public interface IPreferenceService
    {
        IEnumerable<Preference> GetAll();

        IEnumerable<Preference> GetMany(Expression<Func<Preference, bool>> expression);

        Preference Get(Expression<Func<Preference, bool>> expression);

        void Post(Preference preference);

        void Put(Preference preference);

        void Delete(Expression<Func<Preference, bool>> expression);
    }
}
