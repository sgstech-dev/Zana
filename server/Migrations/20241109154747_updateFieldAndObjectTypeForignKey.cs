using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class updateFieldAndObjectTypeForignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "ObjectType",
                newName: "Category_id");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Field",
                newName: "Category_id");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectType_Category_id",
                table: "ObjectType",
                column: "Category_id");

            migrationBuilder.CreateIndex(
                name: "IX_Field_Category_id",
                table: "Field",
                column: "Category_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Field_Category_Category_id",
                table: "Field",
                column: "Category_id",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectType_Category_Category_id",
                table: "ObjectType",
                column: "Category_id",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Field_Category_Category_id",
                table: "Field");

            migrationBuilder.DropForeignKey(
                name: "FK_ObjectType_Category_Category_id",
                table: "ObjectType");

            migrationBuilder.DropIndex(
                name: "IX_ObjectType_Category_id",
                table: "ObjectType");

            migrationBuilder.DropIndex(
                name: "IX_Field_Category_id",
                table: "Field");

            migrationBuilder.RenameColumn(
                name: "Category_id",
                table: "ObjectType",
                newName: "Category");

            migrationBuilder.RenameColumn(
                name: "Category_id",
                table: "Field",
                newName: "Category");
        }
    }
}
