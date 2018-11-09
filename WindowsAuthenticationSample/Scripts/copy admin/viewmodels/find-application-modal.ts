import { ApplicationService } from '../services/application-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const appsDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'ApplicationName',
    sortDirection: 'ASC',
    filterByApplicationName: null,
};

export class FindApplicationModal extends SearchViewModelBase {
    private resolve: (appModel: Models.ApplicationModel) => void;
    private reject: () => void;
    filters: Grid.Filters;
    sorting: Grid.Sorting;
    isLoading = ko.observable(true);
    applications = ko.observableArray([]);
    emptyTableMessage = 'There are no applications to display';

    constructor(private appService: ApplicationService) {
        super();
        this.filters = new Grid.Filters(this.getFilters(), this.search);
        this.paging = new Grid.Paging(this.search, appsDefaultSearch.pageNumber, appsDefaultSearch.pageSize);
        this.sorting = new Grid.Sorting(this.getSortColumns(), appsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
        this.search();
    }

    public open(): Promise<Models.ApplicationModel> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            $('#find-application').modal('show');
        });
    }

    public close = () => {
        this.reject();
        $('#find-application').modal('hide');
    }

    public select = (application: Models.ApplicationModel) => {
        this.resolve(application);
        $('#find-application').modal('hide');
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

    private getFilters() {
        const filterByApplicationName = TypesafeUtil.propertyOf<Models.ApplicationSearchRequestModel>('FilterByApplicationName');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.StringFilter(filterByApplicationName, 'Application Name'));
        return filters;
    }

    private getSortColumns() {
        return [
            { name: 'Application Name', column: 'ApplicationName' }
        ];
    }
}