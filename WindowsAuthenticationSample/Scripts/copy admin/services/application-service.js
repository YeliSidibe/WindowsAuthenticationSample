define(["require", "exports", "./http-client"], function (require, exports, http_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        getApplication(applicationId) {
            return this.httpClient.get(this.serverSettings.Applications.GetApplication, { applicationId });
        }
        search(model) {
            return this.httpClient.get(this.serverSettings.Applications.Search, model);
        }
        updateApplication(model) {
            return this.httpClient.update(this.serverSettings.Applications.Update, model);
        }
        insertApplication(model) {
            return this.httpClient.insert(this.serverSettings.Applications.Insert, model);
        }
    }
    exports.ApplicationService = ApplicationService;
});
//# sourceMappingURL=application-service.js.map