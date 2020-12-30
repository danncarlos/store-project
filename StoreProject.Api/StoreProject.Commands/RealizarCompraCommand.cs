using StoreProject.Models.Shopping;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreProject.Commands {
    public class RealizarCompraCommand {
        
        public string UserId{ get; set; }
        public IList<Compras> Compras { get; set; }


    }
}
