using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Domain.Services;

namespace SoftServe.ITA.PrompterPro.WebApplication.WebApi
{
    public class ActorController : ApiController
    {
        private IActorService actorService;

        public ActorController(IActorService service)
        {
            this.actorService = service;
        }

        // GET: api/Actor
        public IEnumerable<Reader> Get()
        {
            return this.actorService.GetAll();
        }

        // GET: api/Actor/5
        public Reader Get(int id)
        {
            return actorService.Get(id);
        }

        // POST: api/Actor
        [HttpPost]
        public void Post([FromBody]Reader value)
        {
            actorService.Post(value);
        }

        // PUT: api/Actor/5
        [HttpPut]
        public void Put(int id, [FromBody]Reader value)
        {
            actorService.Put(id, value);
        }

        // DELETE: api/Actor/5
        public void Delete(int id)
        {
            actorService.Delete(id);
        }
    }
}
