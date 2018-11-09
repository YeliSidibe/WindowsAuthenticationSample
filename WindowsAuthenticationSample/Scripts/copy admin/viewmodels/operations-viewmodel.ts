import ServerSettings from '../server-settings';
import { OperationService } from '../services/operation-service';
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
    pageSize: 25,
    sortColumn: 'OperationName',
    sortDirection: 'ASC',
    filterByApplicationId: null,
    filterByOperationId: null,
};

export class OperationsViewModel extends SearchViewModelBase {
    private operationService: OperationService;
    private appService: ApplicationService;
    private roleService: RoleService;
    operations = ko.observableArray([]);
    emptyTableMessage = 'There are no operations to display';

    constructor(serverSettings: ServerSettings) {
        super();
        const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
        this.operationService = new OperationService(serverSettings);
        this.appService = new ApplicationService(serverSettings);
        this.roleService = new RoleService(serverSettings);
        this.sorting = new Grid.Sorting(this.getSortColumn(), 'OperationName', 'ASC', resetPagerThenSearch);
        this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
        this.paging = new Grid.Paging(this.search, defaultSearchParams.pageNumber, defaultSearchParams.pageSize);
        this.actions = new Grid.Actions([{ name: 'Create New Operation', action: this.createNewOperationModal }]);
        this.search();
    }

    createNewOperationModal() {
        return;
    }

    editOperationModal() {
        return;
    }

    private getSortColumn() {
        return [
            { name: 'Operation Name', column: 'OperationName' },
            { name: 'Application Name', column: 'ApplicationName' },
        ];
    }

    private getFilters() {
        const filterByApplicationId = TypesafeUtil.propertyOf<Models.OperationSearchRequestModel>('FilterByApplicationId');
        const filterByRoleId = TypesafeUtil.propertyOf<Models.OperationSearchRequestModel>('FilterByRoleId');
        const filters: Grid.IFilter[] = [];
        const appIdQueryString = WindowUtil.getQueryStringParameter('applicationId');
        const roleIdQueryString = WindowUtil.getQueryStringParameter('roleId');
        filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
        filters.push(new Grid.FindRoleFilter(filterByRoleId, 'Role', this.roleService, roleIdQueryString));
        return filters;
    }

    private search = async () => {
        this.isLoading(true);
        try {
            const response = await this.operationService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.operations(response.Operations);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }
}