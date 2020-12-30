using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StoreProject.Models.Core {
    public class BaseEnity {

        [Key]
        public Guid Id { get; set; }
        public bool Ativo { get; private set; } = true;
        public DateTime DtCriacao { get; private set; } = DateTime.Now;

        public void AtivarRegistro() {
            this.Ativo = true;
        }

        public void DesativarRegistro() {
            this.Ativo = false;
        }
    }
}
