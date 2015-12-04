using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Domain.Services;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json.Linq;

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
            return actorService.Get(reader => reader.Id == id);
        }

        // POST: api/Actor
        [HttpPost]
        public IEnumerable<Reader> Post([FromBody]object value)
        {
            JArray objects = JArray.FromObject(value, new JsonSerializer());
            Reader reader = new Reader();
            foreach(JObject read in objects.Children<JObject>())
            {
                foreach (JProperty app in read.Properties())
                {
                    if (app.Name == "LastName")
                        reader.LastName = (string)app.Value;
                    else if (app.Name == "FirstName")
                        reader.FirstName = (string)app.Value;
                    else if (app.Name == "MiddleName")
                        reader.MiddleName = (string)app.Value;                   
                }
                actorService.Post(reader);
            }
            return Get();
        }

        // PUT: api/Actor/5
        [HttpPut]
        public void Put(int id, [FromBody]Reader value)
        {
            if (value.Id != id)
                value.Id = id;
            actorService.Put(value);
        }

        // DELETE: api/Actor/5
        public void Delete(int id)
        {
            actorService.Delete(reader => reader.Id == id);
        }
    }
}
