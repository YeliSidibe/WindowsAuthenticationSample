define(["require", "exports", "./http-client"], function (require, exports, http_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GroupService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        search(model) {
            return this.httpClient.get(this.serverSettings.Groups.Search, model);
        }
        getGroup(groupId) {
            return this.httpClient.get(this.serverSettings.Groups.GetGroup, { groupId });
        }
    }
    exports.GroupService = GroupService;
});
//# sourceMappingURL=group-service.js.map