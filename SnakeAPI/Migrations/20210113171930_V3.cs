﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace SnakeAPI.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Cages_cageName",
                table: "Blocks");

            migrationBuilder.AlterColumn<string>(
                name: "cageName",
                table: "Blocks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CageID",
                table: "Blocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Cages_cageName",
                table: "Blocks",
                column: "cageName",
                principalTable: "Cages",
                principalColumn: "name",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Cages_cageName",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "CageID",
                table: "Blocks");

            migrationBuilder.AlterColumn<string>(
                name: "cageName",
                table: "Blocks",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Cages_cageName",
                table: "Blocks",
                column: "cageName",
                principalTable: "Cages",
                principalColumn: "name",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
