using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addMaxZoomLevelToMapAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DefaultZoomLevel",
                table: "MapAddress",
                newName: "MinZoomLevel");

            migrationBuilder.AddColumn<int>(
                name: "MaxZoomLevel",
                table: "MapAddress",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxZoomLevel",
                table: "MapAddress");

            migrationBuilder.RenameColumn(
                name: "MinZoomLevel",
                table: "MapAddress",
                newName: "DefaultZoomLevel");
        }
    }
}
