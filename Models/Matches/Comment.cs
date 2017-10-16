using MaatjesProjectMVC.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectV2.Models.Matches
{
    public class Comment
    {
        public Person Owner { get; set; }
        public DateTime DateCreated { get; set; }
        public string Text { get; set; }
    }
}
