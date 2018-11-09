var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/user-service", "./groups-viewmodel", "./roles-viewmodel", "./applications-viewmodel", "../services/service-exception", "../infrastructure/window-utility"], function (require, exports, user_service_1, groups_viewmodel_1, roles_viewmodel_1, applications_viewmodel_1, service_exception_1, window_utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserViewModel {
        constructor(serverSettings) {
            this.userInfo = ko.observable();
            this.errors = ko.observableArray([]);
            this.isLoadingAppInfo = ko.observable(true);
            this.getUserInfo = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoadingAppInfo(true);
                try {
                    const userInfo = yield this.userService.getUser(this.userId);
                    this.userInfo(userInfo);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoadingAppInfo(false);
            });
            this.userService = new user_service_1.UserService(serverSettings);
            this.userId = window_utility_1.default.getQueryStringParameter('userId');
            this.getUserInfo();
            this.groupsViewModel = new groups_viewmodel_1.GroupsViewModel(serverSettings);
            this.rolesViewModel = new roles_viewmodel_1.RolesViewModel(serverSettings);
            this.applicationsViewModel = new applications_viewmodel_1.ApplicationsViewModel(serverSettings);
        }
        handleSearchFail(ex) {
            console.debug('search for user failed', ex);
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
    exports.UserViewModel = UserViewModel;
});
//# sourceMappingURL=user-viewmodel.js.map