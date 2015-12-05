using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftServe.ITA.PrompterPro.Domain.Models
{
    public class Preference : BaseModel
    {
        public int Id { get; set; }

        public int ReadingSpeed { get; set; }
        public int FontSize { get; set; }
        public int ScreenWidth { get; set; }
        public int ScreenHeight { get; set; }

        public int ReaderId { get; set; }
        public int ScriptId { get; set; }
        public int LastSectionId { get; set; }

        public Reader Reader { get; set; }
        public Script Script { get; set; }
        public Section LastSection { get; set; }

    }
}
