using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using SoftServe.ITA.PrompterPro.Domain.Models;

namespace SoftServe.ITA.PrompterPro.Infrastructure.Data.EF.PrompterDbContext
{
    public interface IPrompterDbContext : IDisposable
    {
        IDbSet<History> Histories { get; }
        IDbSet<Options> Options { get; }
        IDbSet<Role> Roles { get; }
        IDbSet<Script> Scripts { get; }
        IDbSet<Section> Sections { get; }
        IDbSet<User> Users { get; }
        IDbSet<Reader> Readers { get; set; }
        IDbSet<Preference> Preferences { get; set; }
        IDbSet<Diagnostics> Diagnostics { get; set; }
        IDbSet<UserActivity> UserActivities { get; set; } 

        DbEntityEntry Entry(object entity);
        int SaveChanges();
        void Attach<T>(T baseModel) where T : class, IStateModel;
    }
}
