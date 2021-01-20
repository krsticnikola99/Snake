using Microsoft.EntityFrameworkCore.Migrations;

namespace SnakeAPI.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CageRef",
                table: "Snakes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CageRef",
                table: "Snakes");
        }
    }
}
