using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class modifyGisObjectMetaData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GisObjectMetaData_Field_FieldId",
                table: "GisObjectMetaData");

            migrationBuilder.DropForeignKey(
                name: "FK_GisObjectMetaData_GisObject_gisObjectId",
                table: "GisObjectMetaData");

            migrationBuilder.DropIndex(
                name: "IX_GisObjectMetaData_FieldId",
                table: "GisObjectMetaData");

            migrationBuilder.DropIndex(
                name: "IX_GisObjectMetaData_gisObjectId",
                table: "GisObjectMetaData");

            migrationBuilder.DropColumn(
                name: "FieldId",
                table: "GisObjectMetaData");

            migrationBuilder.DropColumn(
                name: "gisObjectId",
                table: "GisObjectMetaData");

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_Field_id",
                table: "GisObjectMetaData",
                column: "Field_id");

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_Object_id",
                table: "GisObjectMetaData",
                column: "Object_id");

            migrationBuilder.AddForeignKey(
                name: "FK_GisObjectMetaData_Field_Field_id",
                table: "GisObjectMetaData",
                column: "Field_id",
                principalTable: "Field",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GisObjectMetaData_GisObject_Object_id",
                table: "GisObjectMetaData",
                column: "Object_id",
                principalTable: "GisObject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GisObjectMetaData_Field_Field_id",
                table: "GisObjectMetaData");

            migrationBuilder.DropForeignKey(
                name: "FK_GisObjectMetaData_GisObject_Object_id",
                table: "GisObjectMetaData");

            migrationBuilder.DropIndex(
                name: "IX_GisObjectMetaData_Field_id",
                table: "GisObjectMetaData");

            migrationBuilder.DropIndex(
                name: "IX_GisObjectMetaData_Object_id",
                table: "GisObjectMetaData");

            migrationBuilder.AddColumn<int>(
                name: "FieldId",
                table: "GisObjectMetaData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "gisObjectId",
                table: "GisObjectMetaData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_FieldId",
                table: "GisObjectMetaData",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_gisObjectId",
                table: "GisObjectMetaData",
                column: "gisObjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_GisObjectMetaData_Field_FieldId",
                table: "GisObjectMetaData",
                column: "FieldId",
                principalTable: "Field",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GisObjectMetaData_GisObject_gisObjectId",
                table: "GisObjectMetaData",
                column: "gisObjectId",
                principalTable: "GisObject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
