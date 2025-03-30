using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addGroupToField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "ObjectTypeMetaData");

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Field",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Field");

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "ObjectTypeMetaData",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
