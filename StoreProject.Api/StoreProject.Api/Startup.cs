using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using StoreProject.Api.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreProject.Api {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            //DbContext
            services.AddDbContext<StoreProjectDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DbContext")));

            services.AddControllers();

            //Swagger
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", 
                    new OpenApiInfo { 
                        Title = "StoreProject.Api", 
                        Version = "v1",
                        Description = "Site contém url para projeto no GitHub",
                        Contact = new OpenApiContact {
                            Name = "Dannylo Carlos",
                            Email = "danncarlos@outlook.com.br",
                            Url = new Uri("https://github.com/danncarloss/store-project")
                        },
                    });
            });


            //Cors Policy 

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", builder => {
                    builder.WithOrigins("http://localhost:4200", Configuration.GetValue<string>("Urls:Base")).AllowAnyHeader().AllowAnyMethod();
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => {
#if DEBUG
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "StoreProject.Api v1");
#else
                // To deploy on IIS
                    c.SwaggerEndpoint("/store-api/swagger/v1/swagger.json", "StoreProject.Api v1");
#endif


                c.RoutePrefix = "docs";
            });

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
