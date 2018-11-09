namespace WindowsAuthenticationSample.Models.ViewModels
{
    public class ServerSettingsViewModel
    {
        public Applications Applications { get; set; }
        public ServerSettingsViewModel()
        {
            this.Applications = new Applications();
        }
    }

    public class Applications
    {
        public string GetApplication { get; set; }
        public string Search         { get; set; }
        public string GetLogs        { get; set; }
    }
}