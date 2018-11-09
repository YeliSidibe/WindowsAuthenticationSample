import { OperationService } from '../services/operation-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const operationsDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'OperationName',
    sortDirection: 'ASC',
};

export class FindOperationModal extends SearchViewModelBase {
    private resolve: (appModel: Models.OperationModel) => void;
    private reject: () => void;
    filters: Grid.Filters;
    sorting: Grid.Sorting;
    isLoading = ko.observable(true);
    operations = ko.observableArray([]);
    emptyTableMessage = 'There are no operations to display';

    constructor(private operationService: OperationService) {
        super();
        this.filters = new Grid.Filters(this.getFilters(), this.search);
        this.paging = new Grid.Paging(this.search, operationsDefaultSearch.pageNumber, operationsDefaultSearch.pageSize);
        this.sorting = new Grid.Sorting(this.getSortColumns(), operationsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
        this.search();
    }

    public open(): Promise<Models.OperationModel> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            $('#find-operation').modal('show');
        });
    }

    public close = () => {
        this.reject();
        $('#find-operation').modal('hide');
    }

    public select = (operation: Models.OperationModel) => {
        this.resolve(operation);
        $('#find-operation').modal('hide');
    }

    private search = async () => {
        this.isLoading(true);
        this.operations([]);
        try {
            const response = await this.operationService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.operations(response.Operations);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }

    private getFilters() {
        const filterByOperationName = TypesafeUtil.propertyOf<Models.OperationSearchRequestModel>('FilterByOperationName');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.StringFilter(filterByOperationName, 'Operation Name'));
        return filters;
    }

    private getSortColumns() {
        return [
            { name: 'Operation Name', column: 'OperationName' },
        ];
    }
}