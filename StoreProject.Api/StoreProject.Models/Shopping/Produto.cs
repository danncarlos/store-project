using StoreProject.Models.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace StoreProject.Models.Shopping {

    [Table("tb_produto")]
    public class Produto : BaseEnity {

        public Produto(string nome, string descricao, string imagemUrl, decimal preco) {
            Nome = nome;
            Descricao = descricao;
            ImagemUrl = imagemUrl;
            Preco = preco;
        }

        public string Nome { get; private set; }
        public string Descricao { get; private set; }
        public string ImagemUrl { get; private set; }
        public decimal Preco { get; private set; }
    }
}
