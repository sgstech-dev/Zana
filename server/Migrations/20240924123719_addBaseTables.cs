using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addBaseTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Users",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.CreateTable(
                name: "Field",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: false),
                    FieldType = table.Column<int>(type: "integer", nullable: false),
                    ShowInHUD = table.Column<bool>(type: "boolean", nullable: false),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    OwnerType = table.Column<int>(type: "integer", nullable: false),
                    ListOfValue = table.Column<string>(type: "text", nullable: false),
                    SystemCol = table.Column<bool>(type: "boolean", nullable: false),
                    Unit = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Field", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocalizationString",
                columns: table => new
                {
                    StrId = table.Column<decimal>(type: "numeric", nullable: false),
                    StrKey = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    StrValue = table.Column<string>(type: "text", nullable: false),
                    Lang = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalizationString", x => x.StrId);
                });

            migrationBuilder.CreateTable(
                name: "ObjectType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    Pic = table.Column<byte[]>(type: "bytea", nullable: true),
                    Model = table.Column<byte[]>(type: "bytea", nullable: false),
                    Extension = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GisObject",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdentityNo = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    Altitude = table.Column<double>(type: "double precision", nullable: false),
                    Heading = table.Column<double>(type: "double precision", nullable: false),
                    Speed = table.Column<double>(type: "double precision", nullable: false),
                    Parent_id = table.Column<long>(type: "bigint", nullable: false),
                    parent_id = table.Column<long>(type: "bigint", nullable: true),
                    UpdateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ObjectType_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GisObject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GisObject_GisObject_parent_id",
                        column: x => x.parent_id,
                        principalTable: "GisObject",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GisObject_ObjectType_ObjectType_id",
                        column: x => x.ObjectType_id,
                        principalTable: "ObjectType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObjectTypeMetaData",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Field_Id = table.Column<long>(type: "bigint", nullable: false),
                    ObjectType_Id = table.Column<long>(type: "bigint", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectTypeMetaData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObjectTypeMetaData_Field_Field_Id",
                        column: x => x.Field_Id,
                        principalTable: "Field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ObjectTypeMetaData_ObjectType_ObjectType_Id",
                        column: x => x.ObjectType_Id,
                        principalTable: "ObjectType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GisObjectMetaData",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Field_id = table.Column<long>(type: "bigint", nullable: false),
                    FieldId = table.Column<long>(type: "bigint", nullable: false),
                    Object_id = table.Column<long>(type: "bigint", nullable: false),
                    gisObjectId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GisObjectMetaData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GisObjectMetaData_Field_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GisObjectMetaData_GisObject_gisObjectId",
                        column: x => x.gisObjectId,
                        principalTable: "GisObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GisObject_ObjectType_id",
                table: "GisObject",
                column: "ObjectType_id");

            migrationBuilder.CreateIndex(
                name: "IX_GisObject_parent_id",
                table: "GisObject",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_FieldId",
                table: "GisObjectMetaData",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_GisObjectMetaData_gisObjectId",
                table: "GisObjectMetaData",
                column: "gisObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectTypeMetaData_Field_Id",
                table: "ObjectTypeMetaData",
                column: "Field_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectTypeMetaData_ObjectType_Id",
                table: "ObjectTypeMetaData",
                column: "ObjectType_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GisObjectMetaData");

            migrationBuilder.DropTable(
                name: "LocalizationString");

            migrationBuilder.DropTable(
                name: "ObjectTypeMetaData");

            migrationBuilder.DropTable(
                name: "GisObject");

            migrationBuilder.DropTable(
                name: "Field");

            migrationBuilder.DropTable(
                name: "ObjectType");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
