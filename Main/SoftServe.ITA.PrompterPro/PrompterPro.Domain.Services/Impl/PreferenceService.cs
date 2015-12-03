﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Domain.Services;
using SoftServe.ITA.PrompterPro.Infrastructure.Data.EF.PrompterDbContext;

namespace SoftServe.ITA.PrompterPro.Domain.Services.Impl
{
    public class PreferenceService : IPreferenceService
    {
        private readonly IPrompterDbContextFactory _dbContextFactory;

        public PreferenceService(IPrompterDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public IEnumerable<Preference> GetAll()
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Preferences.ToList();
            }
        }

        public IEnumerable<Preference> GetMany(Expression<Func<Preference,bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Preferences.Where(expression).ToList();
            }
        }

        public Preference Get(Expression<Func<Preference, bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Preferences.Where(expression).FirstOrDefault();
            }
        }

        public void Post(Preference Preference)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                context.Preferences.Add(Preference);
                context.SaveChanges();
            }
        }

        public void Put(Preference Preference)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                context.Entry(Preference).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Delete(Expression<Func<Preference, bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                IEnumerable<Preference> delList = context.Preferences.Where(expression).ToList();
                foreach(var Preference in delList)
                {
                    context.Preferences.Remove(Preference);
                }
                context.SaveChanges();
            }
        }
    }
}
