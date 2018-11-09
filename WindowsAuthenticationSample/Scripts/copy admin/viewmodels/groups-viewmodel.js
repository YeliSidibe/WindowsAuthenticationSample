var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/group-service", "../services/role-service", "../services/application-service", "../services/user-service", "../controls/grid-controls", "../infrastructure/typesafe-utility", "../infrastructure/window-utility", "./search-viewmodel-base"], function (require, exports, group_service_1, role_service_1, application_service_1, user_service_1, Grid, typesafe_utility_1, window_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultSearchParams = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'GroupName',
        sortDirection: 'ASC',
        filterByApplicationId: null,
        filterByGroupId: null,
        filterByGroupName: null,
    };
    class GroupsViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(serverSettings) {
            super();
            this.groups = ko.observableArray([]);
            this.emptyTableMessage = 'There are no groups to display';
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                try {
                    const response = yield this.groupService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.groups(response.Groups);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
            this.groupService = new group_service_1.GroupService(serverSettings);
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.userService = new user_service_1.UserService(serverSettings);
            this.roleService = new role_service_1.RoleService(serverSettings);
            this.sorting = new Grid.Sorting(this.getSortColumn(), 'GroupName', 'ASC', resetPagerThenSearch);
            this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
            this.paging = new Grid.Paging(this.search, defaultSearchParams.pageNumber, defaultSearchParams.pageSize);
            this.actions = new Grid.Actions([{ name: 'Create New Group', action: this.createNewGroupModal }]);
            this.search();
        }
        createNewGroupModal() {
            return;
        }
        editGroupModal() {
            return;
        }
        getSortColumn() {
            return [
                { name: 'Group Name', column: 'GroupName' },
                { name: 'Application Name', column: 'ApplicationName' },
            ];
        }
        getFilters() {
            const filterByGroupName = typesafe_utility_1.default.propertyOf('FilterByGroupName');
            const filterByApplicationId = typesafe_utility_1.default.propertyOf('FilterByApplicationId');
            const filterByUserId = typesafe_utility_1.default.propertyOf('FilterByUserId');
            const filterByRoleId = typesafe_utility_1.default.propertyOf('FilterByRoleId');
            const filters = [];
            const appIdQueryString = window_utility_1.default.getQueryStringParameter('applicationId');
            const userIdQueryString = window_utility_1.default.getQueryStringParameter('userId');
            const roleIdQueryString = window_utility_1.default.getQueryStringParameter('roleId');
            filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
            filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
            filters.push(new Grid.FindRoleFilter(filterByRoleId, 'Role', this.roleService, roleIdQueryString));
            filters.push(new Grid.StringFilter(filterByGroupName, 'Group Name'));
            return filters;
        }
    }
    exports.GroupsViewModel = GroupsViewModel;
});
//# sourceMappingURL=groups-viewmodel.js.map