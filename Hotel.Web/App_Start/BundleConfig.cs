using System.Web;
using System.Web.Optimization;

namespace Hotel.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/ie8").Include(
                      "~/js/html5shiv.js",
                      "~/js/respond.min.js",
                      "~/js/lte-ie7.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Main/css").Include(
                      "~/css/bootstrap.min.css",
                      "~/css/bootstrap-theme.css",
                      "~/css/elegant-icons-style.css",
                      "~/css/font-awesome.css",
                      "~/css/style.css",
                      "~/css/style-responsive.css"));

            bundles.Add(new ScriptBundle("~/Main/js").Include(
                      "~/js/jquery.js",
                      "~/js/bootstrap.min.js",
                      "~/js/jquery.scrollTo.min.js",
                      "~/js/jquery.nicescroll.js",
                      "~/js/scripts.js"));
        }
    }
}
