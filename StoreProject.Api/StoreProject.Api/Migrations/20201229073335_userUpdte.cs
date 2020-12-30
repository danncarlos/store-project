using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreProject.Api.Migrations
{
    public partial class userUpdte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "tb_user",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "tb_user");
        }
    }
}
