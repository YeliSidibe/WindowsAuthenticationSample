define(["require", "exports", "./http-client"], function (require, exports, http_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoleService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        search(model) {
            return this.httpClient.get(this.serverSettings.Roles.Search, model);
        }
        getRole(roleId) {
            return this.httpClient.get(this.serverSettings.Roles.GetRole, { roleId });
        }
    }
    exports.RoleService = RoleService;
});
//# sourceMappingURL=role-service.js.map