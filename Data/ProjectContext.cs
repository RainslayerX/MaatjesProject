using MaatjesProjectMVC.Models.MemberViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaatjesProjectV2.Data
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options)
            : base(options)
        { }

        public DbSet<Person> People { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<ElderlyPerson> ElderlyPersons { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<PersonInterest> PersonInterests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Volunteer>();
            modelBuilder.Entity<ElderlyPerson>();

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
