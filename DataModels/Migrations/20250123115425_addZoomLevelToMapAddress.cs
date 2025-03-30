using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addZoomLevelToMapAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "CenterLatitude",
                table: "MapAddress",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CenterLongitude",
                table: "MapAddress",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "DefaultZoomLevel",
                table: "MapAddress",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CenterLatitude",
                table: "MapAddress");

            migrationBuilder.DropColumn(
                name: "CenterLongitude",
                table: "MapAddress");

            migrationBuilder.DropColumn(
                name: "DefaultZoomLevel",
                table: "MapAddress");
        }
    }
}
