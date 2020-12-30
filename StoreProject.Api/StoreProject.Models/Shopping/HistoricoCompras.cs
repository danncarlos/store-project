using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreProject.Models.Shopping {
    [Table("tb_historio_compras")]
    public class HistoricoCompras: StoreProject.Models.Core.BaseEnity {

        public HistoricoCompras(Guid userId, IList<Compras> compras, decimal totalCompra) {
            UserId = userId;
            Compras = compras;
            TotalCompra = totalCompra;
        }

        public Guid UserId { get; private set; }
        public IList<Compras> Compras { get; private set; }
        public decimal TotalCompra { get; private set; }

    }


    public class Compras {

        public Compras(Produto produto, int quantidade) {
            Produto = produto;
            Quantidade = quantidade;
        }

        public Produto Produto { get; private set; }
        public int Quantidade { get; private set; }
    }
}
