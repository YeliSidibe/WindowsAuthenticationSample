import ServerSettings from '../server-settings';
import { RoleService } from '../services/role-service';
import { UserService } from '../services/user-service';
import { GroupService } from '../services/group-service';
import { ApplicationService } from '../services/application-service';
import { OperationService } from '../services/operation-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const defaultSearchParams = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'RoleName',
    sortDirection: 'ASC',
    filterByApplicationId: null,
    filterByRoleId: null,
};

export class RolesViewModel extends SearchViewModelBase {
    private roleService: RoleService;
    private appService: ApplicationService;
    private userService: UserService;
    private groupService: GroupService;
    private operationService: OperationService;
    private appIdQueryString: string;
    private userIdQueryString: string;
    roles = ko.observableArray([]);
    emptyTableMessage = 'There are no roles to display';

    constructor(serverSettings: ServerSettings) {
        super();
        const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
        this.roleService = new RoleService(serverSettings);
        this.appService = new ApplicationService(serverSettings);
        this.userService = new UserService(serverSettings);
        this.groupService = new GroupService(serverSettings);
        this.operationService = new OperationService(serverSettings);
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

    private getSortColumn() {
        return [
            { name: 'Role Name', column: 'RoleName' },
            { name: 'Application Name', column: 'ApplicationName' },
        ];
    }

    private getFilters() {
        const filterByApplicationId = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByApplicationId');
        const filterByGroupId = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByGroupId');
        const filterByRoleId = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByRoleId');
        const filterByRoleName = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByRoleName');
        const filterByUserId = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByUserId');
        const filterByOperationId = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByOperationId');
        const filters: Grid.IFilter[] = [];
        const appIdQueryString = WindowUtil.getQueryStringParameter('applicationId');
        const userIdQueryString = WindowUtil.getQueryStringParameter('userId');
        const groupIdQueryString = WindowUtil.getQueryStringParameter('groupId');
        const operationIdQueryString = WindowUtil.getQueryStringParameter('operationId');
        filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
        filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
        filters.push(new Grid.FindGroupFilter(filterByGroupId, 'Group', this.groupService, groupIdQueryString));
        filters.push(new Grid.FindOperationFilter(filterByOperationId, 'Operation', this.operationService, operationIdQueryString));
        filters.push(new Grid.StringFilter(filterByRoleName, 'Role Name'));
        return filters;
    }

    private search = async () => {
        this.isLoading(true);
        try {
            const response = await this.roleService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.roles(response.Roles);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }
}