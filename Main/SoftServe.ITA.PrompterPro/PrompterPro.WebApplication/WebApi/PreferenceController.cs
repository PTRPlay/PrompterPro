using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Domain.Services;

namespace SoftServe.ITA.PrompterPro.WebApplication.WebApi
{
    public class PreferenceController : ApiController
    {
        private IPreferenceService preferenceService;

        public PreferenceController(IPreferenceService service)
        {
            this.preferenceService = service;
        }

        // GET: api/Preference
        public IEnumerable<Preference> Get()
        {
            return preferenceService.GetAll();
        }

        // GET: api/Preference/5
        public Preference Get(int id)
        {
            return preferenceService.Get(preference => preference.Id == id);
        }

        // POST: api/Preference
        public void Post([FromBody]Preference value)
        {
            preferenceService.Post(value);
        }

        // PUT: api/Preference/5
        public void Put(int id, [FromBody]Preference value)
        {
            if (value.Id != id)
                value.Id = id;
            preferenceService.Put(value);
        }

        // DELETE: api/Preference/5
        public void Delete(int id)
        {
            preferenceService.Delete(preference => preference.Id == id);
        }
    }
}
