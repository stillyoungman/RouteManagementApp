using Microsoft.EntityFrameworkCore.Migrations;

namespace RouteManagementApp.Migrations
{
    public partial class RouteChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Routes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Routes");
        }
    }
}
