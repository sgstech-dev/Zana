using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addBaseLayersToMapAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TargetId",
                table: "Targets",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<double>(
                name: "BandWidth",
                table: "Targets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CenterFreq",
                table: "Targets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DetectedTime",
                table: "Targets",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Detector_id",
                table: "Targets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DeviceType",
                table: "Targets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Elevation",
                table: "Targets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "EnableHunted",
                table: "Targets",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "SNR",
                table: "Targets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "Simulated",
                table: "Targets",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "BaseLayers",
                table: "MapAddress",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Targets_Detector_id",
                table: "Targets",
                column: "Detector_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Targets_GisObject_Detector_id",
                table: "Targets",
                column: "Detector_id",
                principalTable: "GisObject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Targets_GisObject_Detector_id",
                table: "Targets");

            migrationBuilder.DropIndex(
                name: "IX_Targets_Detector_id",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "BandWidth",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "CenterFreq",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "DetectedTime",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "Detector_id",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "DeviceType",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "Elevation",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "EnableHunted",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "SNR",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "Simulated",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "BaseLayers",
                table: "MapAddress");

            migrationBuilder.AlterColumn<Guid>(
                name: "TargetId",
                table: "Targets",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
