using System;
using System.Web.Mvc;

namespace WindowsAuthenticationSample.Infrastructure
{
    public class RoutesForApplication
    {
        private readonly UrlHelper _urlHelper;
        private static string prefixroute = "api/v1";
        public RoutesForApplication(UrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
        }

        public string Search() => prefixroute + _urlHelper.Action("", "applications");
        public string GetApplication() => Search();        
        public string GetLogs() => prefixroute + _urlHelper.Action("","Logs");        
    }
}