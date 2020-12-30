using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreProject.Api.Data;
using StoreProject.Models.Shopping;

namespace StoreProject.Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoComprasController : ControllerBase {
        private readonly StoreProjectDbContext _context;

        public HistoricoComprasController(StoreProjectDbContext context) {
            _context = context;
        }


        [HttpGet]
        [Route("getallhistorybyId/{userId}")]
        public async Task<IActionResult> GetAllHistoryByIdAsync(string userId) {
            try {

                var list = await _context.HistoricoCompras.Where(x => x.UserId == Guid.Parse(userId)).ToListAsync();

                if (list.Count > 0)
                    return Ok(list);
                else
                    return StatusCode(204, "Sem dados registrados");

            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }


    }
}
