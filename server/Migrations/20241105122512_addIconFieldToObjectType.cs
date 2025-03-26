using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addIconFieldToObjectType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pic",
                table: "ObjectType");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Model",
                table: "ObjectType",
                type: "bytea",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "bytea");

            migrationBuilder.AddColumn<string>(
                name: "IconBase64",
                table: "ObjectType",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PicBase64",
                table: "ObjectType",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IconBase64",
                table: "ObjectType");

            migrationBuilder.DropColumn(
                name: "PicBase64",
                table: "ObjectType");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Model",
                table: "ObjectType",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldNullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Pic",
                table: "ObjectType",
                type: "bytea",
                nullable: true);
        }
    }
}
