using SoftServe.ITA.PrompterPro.Domain.Models;

namespace SoftServe.ITA.PrompterPro.Infrastructure.Data.EF.Mapping
{
    public class PreferenceMapping : BaseMapping<Preference>
    {
        public PreferenceMapping()
        {
            HasRequired<Section>(t => t.LastSection)
                .WithMany()
                .HasForeignKey(t => t.LastSectionId);
        }
    }
}
