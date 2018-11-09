define(["require", "exports", "./http-client"], function (require, exports, http_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        search(model) {
            return this.httpClient.get(this.serverSettings.Users.Search, model);
        }
        getUser(userId) {
            return this.httpClient.get(this.serverSettings.Users.GetUser, { userId });
        }
    }
    exports.UserService = UserService;
});
//# sourceMappingURL=user-service.js.map