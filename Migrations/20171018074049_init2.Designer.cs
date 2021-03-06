﻿// <auto-generated />
using MaatjesProject.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;

namespace MaatjesProject.Migrations
{
    [DbContext(typeof(ProjectContext))]
    [Migration("20171018074049_init2")]
    partial class init2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.Interest", b =>
                {
                    b.Property<int>("InterestId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("InterestId");

                    b.ToTable("Interests");
                });

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.Person", b =>
                {
                    b.Property<int>("PersonId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Dementing");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("WheelChair");

                    b.HasKey("PersonId");

                    b.ToTable("People");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Person");
                });

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.PersonInterest", b =>
                {
                    b.Property<int>("PersonId");

                    b.Property<int>("InterestId");

                    b.HasKey("PersonId", "InterestId");

                    b.HasIndex("InterestId");

                    b.ToTable("PersonInterests");
                });

            modelBuilder.Entity("MaatjesProjectV2.Models.Matches.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<int>("MatchId");

                    b.Property<int?>("OwnerPersonId");

                    b.Property<string>("Text");

                    b.HasKey("CommentId");

                    b.HasIndex("MatchId");

                    b.HasIndex("OwnerPersonId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("MaatjesProjectV2.Models.MemberViewModels.Match", b =>
                {
                    b.Property<int>("MatchId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<int?>("ElderlyId");

                    b.Property<int?>("VolunteerId");

                    b.HasKey("MatchId");

                    b.HasIndex("ElderlyId");

                    b.HasIndex("VolunteerId");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.Elderly", b =>
                {
                    b.HasBaseType("MaatjesProjectMVC.Models.MemberViewModels.Person");

                    b.Property<string>("City");

                    b.Property<string>("Department");

                    b.ToTable("Elderly");

                    b.HasDiscriminator().HasValue("Elderly");
                });

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.Volunteer", b =>
                {
                    b.HasBaseType("MaatjesProjectMVC.Models.MemberViewModels.Person");


                    b.ToTable("Volunteer");

                    b.HasDiscriminator().HasValue("Volunteer");
                });

            modelBuilder.Entity("MaatjesProjectMVC.Models.MemberViewModels.PersonInterest", b =>
                {
                    b.HasOne("MaatjesProjectMVC.Models.MemberViewModels.Interest", "Interest")
                        .WithMany("PersonInterests")
                        .HasForeignKey("InterestId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MaatjesProjectMVC.Models.MemberViewModels.Person", "Person")
                        .WithMany("PersonInterests")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MaatjesProjectV2.Models.Matches.Comment", b =>
                {
                    b.HasOne("MaatjesProjectV2.Models.MemberViewModels.Match", "Match")
                        .WithMany("Comments")
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MaatjesProjectMVC.Models.MemberViewModels.Person", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerPersonId");
                });

            modelBuilder.Entity("MaatjesProjectV2.Models.MemberViewModels.Match", b =>
                {
                    b.HasOne("MaatjesProjectMVC.Models.MemberViewModels.Elderly", "Elderly")
                        .WithMany("Matches")
                        .HasForeignKey("ElderlyId");

                    b.HasOne("MaatjesProjectMVC.Models.MemberViewModels.Volunteer", "Volunteer")
                        .WithMany("Matches")
                        .HasForeignKey("VolunteerId");
                });
#pragma warning restore 612, 618
        }
    }
}
