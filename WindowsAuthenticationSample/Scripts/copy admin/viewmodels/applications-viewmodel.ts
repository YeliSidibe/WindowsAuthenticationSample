import { ApplicationService } from '../services/application-service';
import { UserService } from '../services/user-service';
import * as Models from '../models/index';
import ServerSettings from '../server-settings';
import * as Grid from '../controls/grid-controls';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const appsDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'ApplicationName',
    sortDirection: 'ASC',
    filterByApplicationName: null,
    filterByUserId: null,
};

export class ApplicationsViewModel extends SearchViewModelBase {
    private appService: ApplicationService;
    private userService: UserService;
    applications = ko.observableArray([]);
    emptyTableMessage = 'There are no applications to display';

    constructor(serverSettings: ServerSettings) {
        super();
        const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
        this.appService = new ApplicationService(serverSettings);
        this.userService = new UserService(serverSettings);
        this.sorting = new Grid.Sorting(this.getSortColumns(), appsDefaultSearch.sortColumn, 'ASC', resetPagerThenSearch);
        this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
        this.paging = new Grid.Paging(this.search, appsDefaultSearch.pageNumber, appsDefaultSearch.pageSize);
        this.actions = new Grid.Actions([{ name: 'Create New Application', action: this.createApplicationModal }]);
        this.search();
    }

    public createApplicationModal() {
        return;
    }

    private getSortColumns() {
        return [
            { name: 'Application Name', column: 'ApplicationName' }
        ];
    }
    private getFilters() {
        const filterByApplicationName = TypesafeUtil.propertyOf<Models.ApplicationSearchRequestModel>('FilterByApplicationName');
        const filterByUserId = TypesafeUtil.propertyOf<Models.ApplicationSearchRequestModel>('FilterByUserId');
        const userIdQueryString = WindowUtil.getQueryStringParameter('userId');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
        filters.push(new Grid.StringFilter(filterByApplicationName, 'Application Name'));
        return filters;
    }

    private search = async () => {
        this.isLoading(true);
        this.applications([]);
        try {
            const response = await this.appService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.applications(response.Applications);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }
}
