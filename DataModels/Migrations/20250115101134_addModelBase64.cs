using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addModelBase64 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Model",
                table: "ObjectType");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "GisObjectMetaData");

            migrationBuilder.AddColumn<string>(
                name: "ModelBase64",
                table: "ObjectType",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModelBase64",
                table: "ObjectType");

            migrationBuilder.AddColumn<byte[]>(
                name: "Model",
                table: "ObjectType",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "GisObjectMetaData",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
