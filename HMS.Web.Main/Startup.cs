using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HMS.Web.Main.Startup))]
namespace HMS.Web.Main
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
