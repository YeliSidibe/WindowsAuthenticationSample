var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/user-service", "../services/group-service", "../services/role-service", "../services/application-service", "../controls/grid-controls", "../infrastructure/typesafe-utility", "../infrastructure/window-utility", "./search-viewmodel-base"], function (require, exports, user_service_1, group_service_1, role_service_1, application_service_1, Grid, typesafe_utility_1, window_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultSearchParams = {
        pageNumber: 1,
        pageSize: 10,
        sortColumn: 'UserName',
        sortDirection: 'ASC',
        filterByApplicationId: null,
        filterByRoleId: null,
    };
    class UsersViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(serverSettings) {
            super();
            this.users = ko.observableArray([]);
            this.emptyTableMessage = 'There are no users for this application';
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                try {
                    const response = yield this.userService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.users(response.Users);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
            this.userService = new user_service_1.UserService(serverSettings);
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.groupService = new group_service_1.GroupService(serverSettings);
            this.roleService = new role_service_1.RoleService(serverSettings);
            this.sorting = new Grid.Sorting(this.getSortColumn(), 'UserName', 'ASC', resetPagerThenSearch);
            this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
            this.paging = new Grid.Paging(this.search, defaultSearchParams.pageNumber, defaultSearchParams.pageSize);
            this.actions = new Grid.Actions([{ name: 'Create New User', action: this.createNewUserModal }]);
            this.search();
        }
        createNewUserModal() {
            return;
        }
        editUserModal() {
            return;
        }
        getSortColumn() {
            return [
                { name: 'User Name', column: 'UserName' },
                { name: 'First Name', column: 'FirstName' },
                { name: 'Last Name', column: 'LastName' },
                { name: 'Email', column: 'Email' },
                { name: 'Is Approved', column: 'IsApproved' },
                { name: 'Is Locked Out', column: 'IsLockedOut' },
                { name: 'Create Date', column: 'CreateDate' },
                { name: 'Last Login Date', column: 'LastLoginDate' },
                { name: 'Last Password Changed Date', column: 'LastPasswordChangedDate' },
                { name: 'Last Lockout Date', column: 'LastLockoutDate' },
                { name: 'Failed Password Attempts', column: 'FailedPasswordAttemptCount' },
                { name: 'Last Failed Password Attempt', column: 'FailedPasswordAttemptWindowStart' },
                { name: 'Failed Security Question Attempts', column: 'FailedPasswordAnswerAttemptCount' },
                { name: 'Last Failed Security Question Attempt', column: 'FailedPasswordAnswerWindowsStart' },
            ];
        }
        getFilters() {
            const filterByApplicationId = typesafe_utility_1.default.propertyOf('FilterByApplicationId');
            const filterByGroupId = typesafe_utility_1.default.propertyOf('FilterByGroupId');
            const filterByRoleId = typesafe_utility_1.default.propertyOf('FilterByRoleId');
            const filterByEmail = typesafe_utility_1.default.propertyOf('FilterByEmail');
            const filterByFirstName = typesafe_utility_1.default.propertyOf('FilterByFirstName');
            const filterByLastName = typesafe_utility_1.default.propertyOf('FilterByLastName');
            const filterByIsApproved = typesafe_utility_1.default.propertyOf('FilterByIsApproved');
            const filterByIsLockedOut = typesafe_utility_1.default.propertyOf('FilterByIsLockedOut');
            const filterByCreateDate = typesafe_utility_1.default.propertyOf('FilterByCreateDate');
            const filterByLastLoginDate = typesafe_utility_1.default.propertyOf('FilterByLastLoginDate');
            const filterByUserId = typesafe_utility_1.default.propertyOf('FilterByUserId');
            const filters = [];
            const appIdQueryString = window_utility_1.default.getQueryStringParameter('applicationId');
            const groupIdQueryString = window_utility_1.default.getQueryStringParameter('groupId');
            const roleIdQueryString = window_utility_1.default.getQueryStringParameter('roleId');
            filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
            filters.push(new Grid.FindGroupFilter(filterByGroupId, 'Group', this.groupService, groupIdQueryString));
            filters.push(new Grid.FindRoleFilter(filterByRoleId, 'Role', this.roleService, roleIdQueryString));
            filters.push(new Grid.StringFilter(filterByEmail, 'Email'));
            filters.push(new Grid.StringFilter(filterByFirstName, 'First Name'));
            filters.push(new Grid.StringFilter(filterByLastName, 'Last Name'));
            filters.push(new Grid.IsEnabledFilter(filterByIsApproved, 'Approved'));
            filters.push(new Grid.IsEnabledFilter(filterByIsLockedOut, 'Locked Out'));
            filters.push(new Grid.DateFilter(filterByCreateDate, 'Create Date'));
            filters.push(new Grid.DateFilter(filterByLastLoginDate, 'Last Login Date'));
            return filters;
        }
    }
    exports.UsersViewModel = UsersViewModel;
});
//# sourceMappingURL=users-viewmodel.js.map