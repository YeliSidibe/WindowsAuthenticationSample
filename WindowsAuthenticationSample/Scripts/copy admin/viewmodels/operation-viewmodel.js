var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/operation-service", "./roles-viewmodel", "../services/service-exception", "../infrastructure/window-utility"], function (require, exports, operation_service_1, roles_viewmodel_1, service_exception_1, window_utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OperationViewModel {
        constructor(serverSettings) {
            this.operationName = ko.observable('');
            this.description = ko.observable('');
            this.errors = ko.observableArray([]);
            this.isLoadingOperationInfo = ko.observable(true);
            this.getOperation = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoadingOperationInfo(true);
                try {
                    const operation = yield this.operationService.getOperation(this.operationId);
                    this.operationName(operation.OperationName);
                    this.description(operation.Description);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoadingOperationInfo(false);
            });
            this.operationService = new operation_service_1.OperationService(serverSettings);
            this.operationId = window_utility_1.default.getQueryStringParameter('operationId');
            this.getOperation();
            this.rolesViewModel = new roles_viewmodel_1.RolesViewModel(serverSettings);
        }
        handleSearchFail(ex) {
            console.debug('search for operations failed', ex);
            this.errors([]);
            if (ex instanceof service_exception_1.ServiceException) {
                if (ex.isBusinessException && ex.validationMessages.length > 0) {
                    ex.validationMessages.forEach(msg => this.errors.push(msg));
                    return;
                }
            }
            this.errors.push({ Description: 'There was an error on the server.' });
        }
    }
    exports.OperationViewModel = OperationViewModel;
});
//# sourceMappingURL=operation-viewmodel.js.map