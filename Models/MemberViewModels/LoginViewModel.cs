using MaatjesProjectMVC.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectV2.Models.MemberViewModels
{
    public class LoginModel : Volunteer
    {
        public string Wachtwoord { get; set; }
    }
}
