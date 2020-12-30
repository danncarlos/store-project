using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreProject.Models.User {

    [Table("tb_user")]
    public class Usuario: StoreProject.Models.Core.BaseEnity {

        public Usuario(string nome, string email, string telefone) {
            Nome = nome;
            Email = email;
            Telefone = telefone;
        }

        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }

    }
}
