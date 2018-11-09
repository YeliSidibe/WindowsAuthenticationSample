var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/role-service", "./operations-viewmodel", "./users-viewmodel", "./groups-viewmodel", "../services/service-exception", "../infrastructure/window-utility"], function (require, exports, role_service_1, operations_viewmodel_1, users_viewmodel_1, groups_viewmodel_1, service_exception_1, window_utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoleViewModel {
        constructor(serverSettings) {
            this.roleName = ko.observable('');
            this.description = ko.observable('');
            this.errors = ko.observableArray([]);
            this.isLoadingRoleInfo = ko.observable(true);
            this.getRole = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoadingRoleInfo(true);
                try {
                    const userInfo = yield this.roleService.getRole(this.roleId);
                    this.roleName(userInfo.RoleName);
                    this.description(userInfo.Description);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoadingRoleInfo(false);
            });
            this.roleService = new role_service_1.RoleService(serverSettings);
            this.roleId = window_utility_1.default.getQueryStringParameter('roleId');
            this.getRole();
            this.usersViewModel = new users_viewmodel_1.UsersViewModel(serverSettings);
            this.operationsViewModel = new operations_viewmodel_1.OperationsViewModel(serverSettings);
            this.groupsViewModel = new groups_viewmodel_1.GroupsViewModel(serverSettings);
        }
        handleSearchFail(ex) {
            console.debug('search for roles failed', ex);
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
    exports.RoleViewModel = RoleViewModel;
});
//# sourceMappingURL=role-viewmodel.js.map