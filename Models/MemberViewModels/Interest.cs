using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectMVC.Models.MemberViewModels
{
    public class Interest
    {
        public int InterestId { get; set; }
        public string Name { get; set; }

        public List<PersonInterest> PersonInterests { get; set; }
    }

    public class PersonInterest
    {
        public int PersonId { get; set; }
        public Person Person { get; set; }

        public int InterestId { get; set; }
        public Interest Interest { get; set; }
    }
}
