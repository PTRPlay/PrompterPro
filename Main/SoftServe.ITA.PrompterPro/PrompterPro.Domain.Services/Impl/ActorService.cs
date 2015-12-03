using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SoftServe.ITA.PrompterPro.Domain.Models;
using SoftServe.ITA.PrompterPro.Infrastructure.Data;
using SoftServe.ITA.PrompterPro.Infrastructure.Data.EF.PrompterDbContext;

namespace SoftServe.ITA.PrompterPro.Domain.Services.Impl
{
    public class ActorService : IActorService
    {
        private readonly IPrompterDbContextFactory _dbContextFactory;

        public ActorService(IPrompterDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public IEnumerable<Reader> GetAll()
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Readers.ToList();
            }
        }

        public IEnumerable<Reader> GetMany(Expression<Func<Reader,bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Readers.Where(expression).ToList();
            }
        }

        public Reader Get(Expression<Func<Reader, bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                return context.Readers.Where(expression).FirstOrDefault();
            }
        }

        public void Post(Reader reader)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                context.Readers.Add(reader);
                context.SaveChanges();
            }
        }

        public void Put(Reader reader)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                context.Entry(reader).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Delete(Expression<Func<Reader, bool>> expression)
        {
            using (IPrompterDbContext context = _dbContextFactory.Create())
            {
                IEnumerable<Reader> delList = context.Readers.Where(expression).ToList();
                foreach(var reader in delList)
                {
                    context.Readers.Remove(reader);
                }
                context.SaveChanges();
            }
        }
    }
}
