define(["require", "exports", '../utility/http-client'], function (require, exports, http_client_1) {
    "use strict";
    class ApplicationService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        search() {
            return this.httpClient.Get(this.serverSettings.Applications.Search);
        }
    }
    exports.ApplicationService = ApplicationService;
});
