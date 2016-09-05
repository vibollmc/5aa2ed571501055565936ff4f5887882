using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Hotel.Web.Startup))]
namespace Hotel.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
