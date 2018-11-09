using System.Web.Mvc;
using WindowsAuthenticationSample.Infrastructure;
using WindowsAuthenticationSample.Models.ViewModels;

namespace WindowsAuthenticationSample.Controllers
{
    public class ServerSettingsMapper
    {
        private UrlHelper _urlHelper;
        private readonly RoutesForApi _routesForApi;
        public ServerSettingsMapper(UrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
            _routesForApi = new RoutesForApi(urlHelper);
        }

        public ServerSettingsViewModel Generate()
        {
            var serverSettingsViewModel = new ServerSettingsViewModel();
            serverSettingsViewModel.Applications.GetApplication = _routesForApi.Applications.GetApplication();
            serverSettingsViewModel.Applications.Search = _routesForApi.Applications.Search();
            serverSettingsViewModel.Applications.GetLogs = _routesForApi.Applications.GetLogs();

            return serverSettingsViewModel;
        }
    }
}