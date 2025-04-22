using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalTaskTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDaily",
                table: "Tasks",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDaily",
                table: "Tasks");
        }
    }
}
