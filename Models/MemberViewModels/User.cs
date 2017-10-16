using MaatjesProjectMVC.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MaatjesProjectV2.Models.MemberViewModels
{
    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
