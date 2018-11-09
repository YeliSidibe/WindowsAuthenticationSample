using System;

namespace WindowsAuthenticationSample.Models.ViewModels
{
    public class ApplicationViewModel
    {        
        public Guid ApplicationId       { get; set; }
        public string ApplicationName   { get; set; }
        public string ApplicationUrl    { get; set; }
        public string Description       { get; set; }
        /// <summary>
        /// Get the Url to access the logs
        /// </summary>
        public string LogsUrl           { get; set; }
        public ApplicationViewModel()
        {
            ApplicationId = Guid.NewGuid();
            LogsUrl = $"Admin/logs?applicationId={ApplicationId}";
        }       
    }
}