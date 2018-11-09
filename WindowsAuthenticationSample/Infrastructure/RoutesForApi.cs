using System.Web.Mvc;

namespace WindowsAuthenticationSample.Infrastructure
{
    public class RoutesForApi
    {
        private readonly UrlHelper _urlHelper;
        public readonly RoutesForApplication Applications;
        public RoutesForApi(UrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
            Applications = new RoutesForApplication(urlHelper);
        }
    }
}