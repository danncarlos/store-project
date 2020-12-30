using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreProject.Models.Shopping;
using StoreProject.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace StoreProject.Api.Data {
    public class StoreProjectDbContext : DbContext {

        public StoreProjectDbContext(DbContextOptions<StoreProjectDbContext> options) : base(options) {
            Database.Migrate();
            
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            var _jsonOptions = new JsonSerializerOptions {
                DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
            };
            builder.Entity<HistoricoCompras>().Property(x => x.Compras).HasConversion(
                v => JsonSerializer.Serialize(v, _jsonOptions),
                v => JsonSerializer.Deserialize<IList<Compras>>(v, _jsonOptions));

            
        }


        //DbSet's
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<HistoricoCompras> HistoricoCompras { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

    }
}
