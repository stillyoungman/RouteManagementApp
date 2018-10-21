using Microsoft.EntityFrameworkCore.Migrations;

namespace RouteManagementApp.Migrations
{
    public partial class MarkerRefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LatLang",
                table: "Marker",
                newName: "Location");

            migrationBuilder.AddColumn<int>(
                name: "Distance",
                table: "Routes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Routes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Distance",
                table: "Routes");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Routes");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Marker",
                newName: "LatLang");
        }
    }
}
