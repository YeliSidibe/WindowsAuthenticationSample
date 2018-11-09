define(["require", "exports", "./http-client"], function (require, exports, http_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OperationService {
        constructor(serverSettings) {
            this.serverSettings = serverSettings;
            this.httpClient = new http_client_1.HttpClient();
        }
        search(model) {
            return this.httpClient.get(this.serverSettings.Operations.Search, model);
        }
        getOperation(operationId) {
            return this.httpClient.get(this.serverSettings.Operations.GetOperation, { operationId });
        }
    }
    exports.OperationService = OperationService;
});
//# sourceMappingURL=operation-service.js.map