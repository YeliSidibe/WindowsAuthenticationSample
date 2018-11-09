using System.Collections.Generic;
using System.Web.Http;
using WindowsAuthenticationSample.Models.ViewModels;

namespace WindowsAuthenticationSample.api.v1
{
    [RoutePrefix("api/v1/applications")]
    public class ApplicationsController : ApiController
    {
        private static List<ApplicationViewModel> _applications;
        public ApplicationsController()
        {
             var _url = new System.Web.Mvc.UrlHelper();
            _applications = new List<ApplicationViewModel>()
            {
                new ApplicationViewModel() { ApplicationName = "Mobile App", ApplicationUrl = "https://betaagencyservices.flhsmv.gov/RenewalService",Description = "PAY IT Registration Renewals" },
                new ApplicationViewModel() { ApplicationName  = "SelfService", ApplicationUrl = "https://betaagencyservices.flhsmv.gov/SelfServiceRenewal",Description = "ITI Registration Renewals"}
            };
        }

        [HttpGet]
        public List<ApplicationViewModel> Get()
        {
            return _applications;
        }

        [HttpGet]
        [Route("{id}")]
        public List<ApplicationViewModel> Get(string id)
        {
            if (string.IsNullOrEmpty(id)) return _applications;
            else return _applications?.FindAll(a => a.ApplicationId.ToString() == id);
        }
    }
}
