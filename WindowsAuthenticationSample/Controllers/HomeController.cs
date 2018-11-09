using System.Web.Mvc;

namespace WindowsAuthenticationSample.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
            
        }

        //[Authorize]
        [AllowAnonymous]
        public ActionResult Index()
        {
            System.Diagnostics.Debug.WriteLine($"User logged in {this.User?.Identity.Name}");
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}