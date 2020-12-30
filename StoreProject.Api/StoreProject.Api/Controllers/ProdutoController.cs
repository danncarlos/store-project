using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreProject.Api.Data;
using StoreProject.Commands;
using StoreProject.Models.Shopping;

namespace StoreProject.Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]

    public class ProdutoController : ControllerBase {
        private readonly StoreProjectDbContext _context;

        public ProdutoController(StoreProjectDbContext context) {
            _context = context;
        }

        [HttpGet]
        [Route("seedProducts")]
        public async Task<IActionResult> SeedProducts() {
            try {


                var prodList = new List<Produto> {
                    new Produto("Jaqueta de pele de Chinchila", "Jaqueta de pele de chinchila e vison marrom tosquiada EM-EL feminino", "https://images-na.ssl-images-amazon.com/images/I/61iEsBFNfuL._AC_UL1200_.jpg", 4350),
                    new Produto("Jaqueta de pele de Zibelina", "Sable suntuosa! Esta linda jaqueta de pele apresenta uma gola de pele de marta canadense com lapidação cruzada e punhos virados para trás em uma jaqueta clássica de pele de vison tingida de preto", "https://images-na.ssl-images-amazon.com/images/I/51m0WNQm8fL._AC_UL1200_.jpg", 6420),
                    new Produto("Casaco de pele sintética Remelon", "Casaco de pele sintética Remelon feminino de manga longa inverno quente lapela raposa casaco de pele falsa sobretudo com bolsos", "https://images-na.ssl-images-amazon.com/images/I/61tib8HwyRL._AC_UL1000_.jpg", 840),
                    new Produto("Casaco de pele sintética Remelon Amarelo", "Casaco de pele sintética Remelon feminino de manga longa inverno quente lapela raposa casaco de pele falsa sobretudo com bolsos", "https://m.media-amazon.com/images/I/71pLLeGu0YL._AC_UL1292_.jpg", 890),

                    //new
                    new Produto("Mr/s Camisa", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in aenean.", "https://images3.pricecheck.co.za/images/objects/hash/product/90d/05a/6af/image_big_168671010.jpg?1564052074", 154),
                    new Produto("Cringe. T-shirt", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in aenean.", "https://designslots.com/wp-content/uploads/2015/06/Cover6-250x150.jpg", 140),
                    new Produto("Baby Toon", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in aenean.", "https://lh3.googleusercontent.com/proxy/QwhgzaYM6bfSypXwwqjGuPAvSaKUrFkNhBtyfEdd1wKp2c003PPdyjzaGUUdClKcFLgw55bFEaY3yAQ6GAUK8pboKDkoaPeq3NtsAU72zVUTLEqGpzE_YmETgNQoLzsm7OIgEK21dW--htK2YSFVkYpnvLp2Mmj0pA", 200),
                    new Produto("OPL T-Shirt series", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in aenean.", "https://opl.lib.in.us/wp-content/uploads/2020/04/shirt-a-250x150.png", decimal.Parse("241,50"))


                };



                var finalList = new List<Produto>();
                foreach(var item in prodList) {
                    if (!_context.Produtos.AnyAsync(x => x.Nome == item.Nome).Result) finalList.Add(item);
                }

                if(finalList.Count > 1)
                    await _context.Produtos.AddRangeAsync(finalList);
    
                
                await _context.SaveChangesAsync();
                return Ok("Finalizado");

            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getallproducts")]
        public async Task<IActionResult> GetAllProductsAsync() {
            try {

                var list = await _context.Produtos.ToListAsync();
                if (list.Count > 0)
                    return Ok(list);
                else
                    return StatusCode(204, "Sem dados registrados");
            }
            catch(Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("realizarcompra")]
        public async Task<IActionResult> RealizarCompraAsync([FromBody]RealizarCompraCommand model) {
            try {

                decimal total = 0;

                foreach (var item in model.Compras) {
                    total += (item.Produto.Preco * item.Quantidade);
                }

                var novaCompra = new HistoricoCompras(Guid.Parse(model.UserId), model.Compras, total);

                await _context.HistoricoCompras.AddAsync(novaCompra);
                await _context.SaveChangesAsync();

                return Ok("Compra realizada com sucesso.");
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }

        }

    }
}
