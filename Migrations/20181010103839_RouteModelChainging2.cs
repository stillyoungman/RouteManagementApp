using Microsoft.EntityFrameworkCore.Migrations;

namespace RouteManagementApp.Migrations
{
    public partial class RouteModelChainging2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bounds",
                table: "Routes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Created",
                table: "Routes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bounds",
                table: "Routes");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Routes");
        }
    }
}
