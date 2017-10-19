using MaatjesProjectMVC.Models.MemberViewModels;
using MaatjesProjectV2.Models.Matches;
using MaatjesProjectV2.Models.MemberViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectV2.Data
{
    public class ProjectContext : IdentityDbContext<ApplicationUser>
    {
        public ProjectContext(DbContextOptions<ProjectContext> options)
            : base(options)
        { }

        public DbSet<Person> People { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<Elderly> ElderlyPeople { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<PersonInterest> PersonInterests { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PersonInterest>()
            .HasKey(t => new { t.PersonId, t.InterestId });

            modelBuilder.Entity<PersonInterest>()
                .HasOne(pt => pt.Person)
                .WithMany(p => p.PersonInterests)
                .HasForeignKey(pt => pt.PersonId);

            modelBuilder.Entity<PersonInterest>()
                .HasOne(pt => pt.Interest)
                .WithMany(p => p.PersonInterests)
                .HasForeignKey(pt => pt.InterestId);
        }
    }
}
