﻿using MaatjesProjectMVC.Models.MemberViewModels;
using MaatjesProject.Models.Matches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProject.Models.MemberViewModels
{
    public class Match
    {
        public int MatchId { get; set; }
        public DateTime DateCreated { get; set; }
        
        public int? VolunteerId { get; set; }
        public Volunteer Volunteer { get; set; }

        public int? ElderlyId { get; set; }
        public Elderly Elderly { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
