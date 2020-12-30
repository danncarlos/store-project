using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreProject.Api.Migrations
{
    public partial class userUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "tb_user",
                newName: "Telefone");

            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "tb_user",
                newName: "Nome");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Telefone",
                table: "tb_user",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "tb_user",
                newName: "Senha");
        }
    }
}
