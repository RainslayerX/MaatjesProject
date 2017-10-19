using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MaatjesProjectV2.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_People_ElderlyPersonId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_ElderlyPersonId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "ElderlyPersonId",
                table: "Matches");

            migrationBuilder.AddColumn<int>(
                name: "ElderlyId",
                table: "Matches",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_ElderlyId",
                table: "Matches",
                column: "ElderlyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_People_ElderlyId",
                table: "Matches",
                column: "ElderlyId",
                principalTable: "People",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_People_ElderlyId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_ElderlyId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "ElderlyId",
                table: "Matches");

            migrationBuilder.AddColumn<int>(
                name: "ElderlyPersonId",
                table: "Matches",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_ElderlyPersonId",
                table: "Matches",
                column: "ElderlyPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_People_ElderlyPersonId",
                table: "Matches",
                column: "ElderlyPersonId",
                principalTable: "People",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
