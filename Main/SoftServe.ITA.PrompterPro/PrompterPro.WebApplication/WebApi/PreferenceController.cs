using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Domain.Services;
using Newtonsoft.Json.Linq;

namespace SoftServe.ITA.PrompterPro.WebApplication.WebApi
{
    public class PreferenceController : ApiController
    {
        private IPreferenceService preferenceService;
        private IActorService actorService;

        public PreferenceController(IPreferenceService service, IActorService actService)
        {
            this.preferenceService = service;
            this.actorService = actService;
        }

        // GET: api/Preference
        public IEnumerable<Preference> Get()
        {
            return preferenceService.GetAll();
        }

        // GET: api/Preference/5
        public Preference Get(string id)
        {
            if (id == "undefined") return null;
            string[] input = id.Split(' ');
            int actorId = int.Parse(input[0]);
            int scriptId = int.Parse(input[1]);
            Preference result = preferenceService.Get(preference => preference.ReaderId == actorId && preference.ScriptId == scriptId);
            return result;
        }

        // POST: api/Preference
        public void Post([FromBody]Preference value)
        {
            preferenceService.Post(value);
        }

        // PUT: api/Preference/5
        public void Put([FromBody]object value) //int id,
        {
            JObject JPreference = JObject.FromObject(value, new Newtonsoft.Json.JsonSerializer());
            Preference preference = new Preference();
            foreach (JProperty app in JPreference.Properties())
            {
                if (app.Name == "ReadingSpeed")
                    preference.ReadingSpeed = (int)app.Value;
                if (app.Name == "FontSize")
                    preference.FontSize = (int)app.Value;
                if (app.Name == "ScreenWidth")
                    preference.ScreenWidth = (int)app.Value;
                if (app.Name == "ScreenHeight")
                    preference.ScreenHeight = (int)app.Value;
                if (app.Name == "ScriptId")
                    preference.ScriptId = (int)app.Value;
                if (app.Name == "ReaderId")
                    preference.ReaderId = (int)app.Value;
                if (app.Name == "LastSectionId")
                    preference.LastSectionId = (int)app.Value;
            }
            Reader currentActor = actorService.Get(actor => actor.Id == preference.ReaderId);
            currentActor.LastScriptId = preference.ScriptId;
            actorService.Put(currentActor);
            preferenceService.Put(preference);
        }

        // DELETE: api/Preference/5
        public void Delete(int id)
        {
            preferenceService.Delete(preference => preference.Id == id);
        }
    }
}
