using MaatjesProjectMVC.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectV2.Models.MemberViewModels
{
    public class Match
    {
        public DateTime DateCreated { get; set; }
        public Volunteer Volunteer { get; set; }
        public ElderlyPerson ElderlyPerson { get; set; }
    }
}
