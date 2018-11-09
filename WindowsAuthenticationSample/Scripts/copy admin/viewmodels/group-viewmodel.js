var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/group-service", "./roles-viewmodel", "./users-viewmodel", "../services/service-exception", "../infrastructure/window-utility"], function (require, exports, group_service_1, roles_viewmodel_1, users_viewmodel_1, service_exception_1, window_utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GroupViewModel {
        constructor(serverSettings) {
            this.groupName = ko.observable('');
            this.description = ko.observable('');
            this.errors = ko.observableArray([]);
            this.isLoadingGroupInfo = ko.observable(true);
            this.getGroup = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoadingGroupInfo(true);
                try {
                    const group = yield this.groupService.getGroup(this.groupId);
                    this.groupName(group.GroupName);
                    this.description(group.Description);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoadingGroupInfo(false);
            });
            this.groupService = new group_service_1.GroupService(serverSettings);
            this.groupId = window_utility_1.default.getQueryStringParameter('groupId');
            this.getGroup();
            this.usersViewModel = new users_viewmodel_1.UsersViewModel(serverSettings);
            this.rolesViewModel = new roles_viewmodel_1.RolesViewModel(serverSettings);
        }
        handleSearchFail(ex) {
            console.debug('search for groups failed', ex);
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
    exports.GroupViewModel = GroupViewModel;
});
//# sourceMappingURL=group-viewmodel.js.map