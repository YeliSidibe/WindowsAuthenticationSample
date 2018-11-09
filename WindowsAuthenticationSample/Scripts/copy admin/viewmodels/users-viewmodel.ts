import ServerSettings from '../server-settings';
import { UserService } from '../services/user-service';
import { GroupService } from '../services/group-service';
import { RoleService } from '../services/role-service';
import { ApplicationService } from '../services/application-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const defaultSearchParams = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'UserName',
    sortDirection: 'ASC',
    filterByApplicationId: null,
    filterByRoleId: null,
};

export class UsersViewModel extends SearchViewModelBase {
    private userService: UserService;
    private appService: ApplicationService;
    private groupService: GroupService;
    private roleService: RoleService;
    users = ko.observableArray([]);
    emptyTableMessage = 'There are no users for this application';

    constructor(serverSettings: ServerSettings) {
        super();
        const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
        this.userService = new UserService(serverSettings);
        this.appService = new ApplicationService(serverSettings);
        this.groupService = new GroupService(serverSettings);
        this.roleService = new RoleService(serverSettings);
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

    private getSortColumn() {
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

    private getFilters() {
        const filterByApplicationId = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByApplicationId');
        const filterByGroupId = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByGroupId');
        const filterByRoleId = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByRoleId');
        const filterByEmail = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByEmail');
        const filterByFirstName = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByFirstName');
        const filterByLastName = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByLastName');
        const filterByIsApproved = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByIsApproved');
        const filterByIsLockedOut = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByIsLockedOut');
        const filterByCreateDate = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByCreateDate');
        const filterByLastLoginDate = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByLastLoginDate');
        const filterByUserId = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByUserId');
        const filters: Grid.IFilter[] = [];
        const appIdQueryString = WindowUtil.getQueryStringParameter('applicationId');
        const groupIdQueryString = WindowUtil.getQueryStringParameter('groupId');
        const roleIdQueryString = WindowUtil.getQueryStringParameter('roleId');
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

    private search = async () => {
        this.isLoading(true);
        try {
            const response = await this.userService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.users(response.Users);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }
}