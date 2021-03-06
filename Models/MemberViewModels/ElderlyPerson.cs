﻿using MaatjesProject.Models.MemberViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectMVC.Models.MemberViewModels
{
    public class Elderly : Person
    {
        [Display(Name = "Woonplaats")]
        public string City { get; set; }

        [Display(Name = "Afdeling")]
        public string Department { get; set; }
    }
}
