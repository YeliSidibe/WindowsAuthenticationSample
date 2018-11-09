using System;
using System.Web.Mvc;
using WindowsAuthenticationSample.Models.ViewModels;

namespace WindowsAuthenticationSample.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {        
        public ActionResult Index()
        {
            return View(GetServerSettings());
        }

        [Route("{applicationId}")]
        public ActionResult Logs(Guid applicationId)
        {
            return View(GetServerSettings());
        }
           
        private ServerSettingsViewModel GetServerSettings()
        {
            var serverSettingsMapper = new ServerSettingsMapper(Url);
            return serverSettingsMapper.Generate();
        }
    }
}