using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreProject.Api.Data;
using StoreProject.Commands;
using StoreProject.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreProject.Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {

        private readonly StoreProjectDbContext _context;

        public UsuarioController(StoreProjectDbContext context) {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginCommand model) {
            try {
                Guid created = Guid.Empty;

                Usuario _user = null;
                if (!String.IsNullOrEmpty(model.Email)) {
                    _user = await _context.Usuarios.Where(x => x.Email == model.Email).FirstOrDefaultAsync();
                }
                if (!String.IsNullOrEmpty(model.Nome) && _user == null) {
                    _user = await _context.Usuarios.Where(x => x.Nome == model.Nome).FirstOrDefaultAsync();
                }
                if (!String.IsNullOrEmpty(model.Tel) && _user == null) {
                    _user = await _context.Usuarios.Where(x => x.Telefone == model.Tel).FirstOrDefaultAsync();
                }


                if (_user == null) {
                    created = await RegistrarAsync(model);
                }

                return _user != null ? Ok(_user.Id) : Ok(created);

                //return Ok(_user.Id);
            }
            catch(Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        private async Task<Guid> RegistrarAsync(LoginCommand model) {
            var user = new Usuario(model.Nome, model.Email, model.Tel);

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user.Id;
        }


    }
}
