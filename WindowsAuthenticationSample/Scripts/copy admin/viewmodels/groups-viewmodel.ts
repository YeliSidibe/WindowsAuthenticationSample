import ServerSettings from '../server-settings';
import { GroupService } from '../services/group-service';
import { RoleService } from '../services/role-service';
import { ApplicationService } from '../services/application-service';
import { UserService } from '../services/user-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const defaultSearchParams = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'GroupName',
    sortDirection: 'ASC',
    filterByApplicationId: null,
    filterByGroupId: null,
    filterByGroupName: null,
};

export class GroupsViewModel extends SearchViewModelBase {
    private groupService: GroupService;
    private appService: ApplicationService;
    private userService: UserService;
    private roleService: RoleService;
    groups = ko.observableArray([]);
    emptyTableMessage = 'There are no groups to display';

    constructor(serverSettings: ServerSettings) {
        super();
        const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
        this.groupService = new GroupService(serverSettings);
        this.appService = new ApplicationService(serverSettings);
        this.userService = new UserService(serverSettings);
        this.roleService = new RoleService(serverSettings);
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

    private getSortColumn() {
        return [
            { name: 'Group Name', column: 'GroupName' },
            { name: 'Application Name', column: 'ApplicationName' },
        ];
    }

    private getFilters() {
        const filterByGroupName = TypesafeUtil.propertyOf<Models.GroupSearchRequestModel>('FilterByGroupName');
        const filterByApplicationId = TypesafeUtil.propertyOf<Models.GroupSearchRequestModel>('FilterByApplicationId');
        const filterByUserId = TypesafeUtil.propertyOf<Models.GroupSearchRequestModel>('FilterByUserId');
        const filterByRoleId = TypesafeUtil.propertyOf<Models.GroupSearchRequestModel>('FilterByRoleId');
        const filters: Grid.IFilter[] = [];
        const appIdQueryString = WindowUtil.getQueryStringParameter('applicationId');
        const userIdQueryString = WindowUtil.getQueryStringParameter('userId');
        const roleIdQueryString = WindowUtil.getQueryStringParameter('roleId');
        filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
        filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
        filters.push(new Grid.FindRoleFilter(filterByRoleId, 'Role', this.roleService, roleIdQueryString));
        filters.push(new Grid.StringFilter(filterByGroupName, 'Group Name'));
        return filters;
    }

    private search = async () => {
        this.isLoading(true);
        try {
            const response = await this.groupService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.groups(response.Groups);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }
}