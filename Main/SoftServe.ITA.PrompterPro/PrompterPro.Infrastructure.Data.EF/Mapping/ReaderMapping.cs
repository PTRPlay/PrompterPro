using SoftServe.ITA.PrompterPro.Domain.Models;  

namespace SoftServe.ITA.PrompterPro.Infrastructure.Data.EF.Mapping
{
    public class ReaderMapping : BaseMapping<Reader>
    {
        public ReaderMapping()
        {
            Property(t => t.FirstName).HasMaxLength(30);
            Property(t => t.MiddleName).HasMaxLength(30);
            Property(t => t.LastName).HasMaxLength(30);

            HasOptional<Script>(t => t.LastScript)
                .WithMany()
                .HasForeignKey(t => t.LastScriptId);
        }
    }
}
