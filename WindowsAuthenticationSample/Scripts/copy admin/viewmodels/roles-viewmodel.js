var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/role-service", "../services/user-service", "../services/group-service", "../services/application-service", "../services/operation-service", "../controls/grid-controls", "../infrastructure/typesafe-utility", "../infrastructure/window-utility", "./search-viewmodel-base"], function (require, exports, role_service_1, user_service_1, group_service_1, application_service_1, operation_service_1, Grid, typesafe_utility_1, window_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultSearchParams = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'RoleName',
        sortDirection: 'ASC',
        filterByApplicationId: null,
        filterByRoleId: null,
    };
    class RolesViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(serverSettings) {
            super();
            this.roles = ko.observableArray([]);
            this.emptyTableMessage = 'There are no roles to display';
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                try {
                    const response = yield this.roleService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.roles(response.Roles);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
            this.roleService = new role_service_1.RoleService(serverSettings);
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.userService = new user_service_1.UserService(serverSettings);
            this.groupService = new group_service_1.GroupService(serverSettings);
            this.operationService = new operation_service_1.OperationService(serverSettings);
            this.sorting = new Grid.Sorting(this.getSortColumn(), 'RoleName', 'ASC', resetPagerThenSearch);
            this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
            this.paging = new Grid.Paging(this.search, defaultSearchParams.pageNumber, defaultSearchParams.pageSize);
            this.actions = new Grid.Actions([{ name: 'Create New Role', action: this.createNewRoleModal }]);
            this.search();
        }
        createNewRoleModal() {
            return;
        }
        editRoleModal() {
            return;
        }
        getSortColumn() {
            return [
                { name: 'Role Name', column: 'RoleName' },
                { name: 'Application Name', column: 'ApplicationName' },
            ];
        }
        getFilters() {
            const filterByApplicationId = typesafe_utility_1.default.propertyOf('FilterByApplicationId');
            const filterByGroupId = typesafe_utility_1.default.propertyOf('FilterByGroupId');
            const filterByRoleId = typesafe_utility_1.default.propertyOf('FilterByRoleId');
            const filterByRoleName = typesafe_utility_1.default.propertyOf('FilterByRoleName');
            const filterByUserId = typesafe_utility_1.default.propertyOf('FilterByUserId');
            const filterByOperationId = typesafe_utility_1.default.propertyOf('FilterByOperationId');
            const filters = [];
            const appIdQueryString = window_utility_1.default.getQueryStringParameter('applicationId');
            const userIdQueryString = window_utility_1.default.getQueryStringParameter('userId');
            const groupIdQueryString = window_utility_1.default.getQueryStringParameter('groupId');
            const operationIdQueryString = window_utility_1.default.getQueryStringParameter('operationId');
            filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
            filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
            filters.push(new Grid.FindGroupFilter(filterByGroupId, 'Group', this.groupService, groupIdQueryString));
            filters.push(new Grid.FindOperationFilter(filterByOperationId, 'Operation', this.operationService, operationIdQueryString));
            filters.push(new Grid.StringFilter(filterByRoleName, 'Role Name'));
            return filters;
        }
    }
    exports.RolesViewModel = RolesViewModel;
});
//# sourceMappingURL=roles-viewmodel.js.map