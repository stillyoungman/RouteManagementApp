using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using RouteManagementApp.Data;
using RouteManagementApp.Data.Access;
using RouteManagementApp.Helpers;
using RouteManagementApp.Services;
using AutoMapper;

//isDevelopment
using RouteManagementApp.Debug;


namespace RouteManagementApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            var tldbStr = @"Server=127.0.0.1,1433;
                        Database=mojave;
                        User Id=SA;
                        Password=D3plP@$$_!cvB";

            services.AddDbContext<MainContext>(options => options.UseSqlServer(tldbStr));

            services.AddScoped<IRouteRepository, MockRouteRepository>();
            services.AddScoped<IUserRepository,MockUserRepository>();
            services.AddScoped<IUserService,MockUserService>();
            services.AddScoped<IUnitOfWork,MockUnitOfWork>();
            
            services.AddAutoMapper();

            var key = Encoding.ASCII.GetBytes("mySuperSecretKey!12345678_easy");

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                // x.Events = new JwtBearerEvents
                // {
                //     OnTokenValidated = context =>
                //     {
                //         var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                //         var userId = int.Parse(context.Principal.Identity.Name);
                //         var user = userService.GetById(userId);
                //         if (user == null)
                //         {
                //             // return unauthorized if user no longer exists
                //             context.Fail("Unauthorized");
                //         }
                //         return Task.CompletedTask;
                //     }
                // };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
