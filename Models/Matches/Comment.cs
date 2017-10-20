using MaatjesProjectMVC.Models.MemberViewModels;
using MaatjesProject.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProject.Models.Matches
{
    public class Comment
    {
        public int CommentId { get; set; }
        public Person Owner { get; set; }
        public DateTime DateCreated { get; set; }
        public string Text { get; set; }

        public int MatchId { get; set; }
        public Match Match { get; set; }
    }
}
