using MaatjesProjectV2.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectMVC.Models.MemberViewModels
{
    public class Person
    {
        public int PersonId { get; set; }

        [Display(Name = "Naam")]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Display(Name = "Telefoon")]
        [Phone]
        public string PhoneNumber { get; set; }
        
        [Display(Name = "Rolstoel")]
        public bool WheelChair { get; set; }

        [Display(Name = "Dement")]
        public bool Dementing { get; set; }

        public List<PersonInterest> PersonInterests { get; set; }
        public List<Match> Matches { get; set; }
    }
}
