define(["require", "exports", "../services/service-exception"], function (require, exports, service_exception_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SearchViewModelBase {
        constructor() {
            this.isLoading = ko.observable(true);
            this.errors = ko.observableArray([]);
        }
        handleSearchFail(ex) {
            console.debug('search for operations failed', ex);
            if (ex instanceof service_exception_1.ServiceException) {
                if (ex.isBusinessException && ex.validationMessages.length > 0) {
                    ex.validationMessages.forEach(msg => this.errors.push(msg));
                    return;
                }
            }
            this.errors.push({ Description: 'There was an error on the server.' });
        }
        getSearchModel() {
            const model = {
                PageSize: this.paging.pageSize,
                PageNumber: this.paging.pageNumber(),
                SortColumn: this.sorting.sortColumn,
                SortDirection: this.sorting.sortDirection
            };
            const filterValues = this.filters.getFilterValues();
            return Object.assign({}, model, filterValues);
        }
        resetPagerThenSearch(search) {
            return () => {
                this.paging.reset();
                return search();
            };
        }
    }
    exports.SearchViewModelBase = SearchViewModelBase;
});
//# sourceMappingURL=search-viewmodel-base.js.map