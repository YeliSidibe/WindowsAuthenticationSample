var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/application-service", "./operations-viewmodel", "./groups-viewmodel", "./roles-viewmodel", "./users-viewmodel", "../infrastructure/window-utility"], function (require, exports, application_service_1, operations_viewmodel_1, groups_viewmodel_1, roles_viewmodel_1, users_viewmodel_1, window_utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationViewModel {
        constructor(serverSettings) {
            this.applicationName = ko.observable('');
            this.description = ko.observable('');
            this.isLoadingAppInfo = ko.observable(true);
            this.getAppInfo = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoadingAppInfo(true);
                const appInfo = yield this.appService.getApplication(this.applicationId);
                this.applicationName(appInfo.ApplicationName);
                this.description(appInfo.Description);
                this.isLoadingAppInfo(false);
            });
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.applicationId = window_utility_1.default.getQueryStringParameter('applicationId');
            this.getAppInfo();
            this.operationsViewModel = new operations_viewmodel_1.OperationsViewModel(serverSettings);
            this.groupsViewModel = new groups_viewmodel_1.GroupsViewModel(serverSettings);
            this.rolesViewModel = new roles_viewmodel_1.RolesViewModel(serverSettings);
            this.usersViewModel = new users_viewmodel_1.UsersViewModel(serverSettings);
        }
    }
    exports.ApplicationViewModel = ApplicationViewModel;
});
//# sourceMappingURL=application-viewmodel.js.map