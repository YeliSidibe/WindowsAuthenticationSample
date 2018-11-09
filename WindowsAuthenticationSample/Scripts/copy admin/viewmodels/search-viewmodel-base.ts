import * as Grid from '../controls/grid-controls';
import { ServiceException } from '../services/service-exception';
import * as Models from '../models/index';

export abstract class SearchViewModelBase {
    isLoading = ko.observable(true);
    errors = ko.observableArray([]);
    paging: Grid.Paging;
    sorting: Grid.Sorting;
    filters: Grid.Filters;
    actions: Grid.Actions;
    abstract emptyTableMessage: string;

    protected handleSearchFail(ex: any) {
        console.debug('search for operations failed', ex);
        if (ex instanceof ServiceException) {
            if (ex.isBusinessException && ex.validationMessages.length > 0) {
                ex.validationMessages.forEach(msg => this.errors.push(msg));
                return;
            }
        }
        this.errors.push({ Description: 'There was an error on the server.' });
    }

    protected getSearchModel() {
        const model: Models.SearchRequestModel = {
            PageSize: this.paging.pageSize,
            PageNumber: this.paging.pageNumber(),
            SortColumn: this.sorting.sortColumn,
            SortDirection: this.sorting.sortDirection
        };
        const filterValues = this.filters.getFilterValues();
        return {
            ...model,
            ...filterValues,
        };
    }

    protected resetPagerThenSearch(search: () => Promise<void>) {
        return () => {
            this.paging.reset();
            return search();
        }
    }
}