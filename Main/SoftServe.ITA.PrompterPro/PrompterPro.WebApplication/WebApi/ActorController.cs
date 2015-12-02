using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SoftServe.ITA.PrompterPro.WebApplication.WebApi
{
    public class ActorController : ApiController
    {
        // GET: api/Actor
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Actor/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Actor
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Actor/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Actor/5
        public void Delete(int id)
        {
        }
    }
}
