using Microsoft.EntityFrameworkCore.Migrations;

namespace RouteManagementApp.Migrations
{
    public partial class MarkerCommentAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Marker",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Marker");
        }
    }
}
