using MaatjesProjectMVC.Models.MemberViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProject.Models.MemberViewModels
{
    public class ApplicationUser : IdentityUser
    {
        public int? PersonId { get; set; }
        public Person Person { get; set; }
    }
}
