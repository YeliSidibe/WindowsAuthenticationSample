var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../controls/grid-controls", "../infrastructure/typesafe-utility", "./search-viewmodel-base"], function (require, exports, Grid, typesafe_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appsDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'ApplicationName',
        sortDirection: 'ASC',
        filterByApplicationName: null,
    };
    class FindApplicationModal extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(appService) {
            super();
            this.appService = appService;
            this.isLoading = ko.observable(true);
            this.applications = ko.observableArray([]);
            this.emptyTableMessage = 'There are no applications to display';
            this.close = () => {
                this.reject();
                $('#find-application').modal('hide');
            };
            this.select = (application) => {
                this.resolve(application);
                $('#find-application').modal('hide');
            };
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.applications([]);
                try {
                    const response = yield this.appService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.applications(response.Applications);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            this.filters = new Grid.Filters(this.getFilters(), this.search);
            this.paging = new Grid.Paging(this.search, appsDefaultSearch.pageNumber, appsDefaultSearch.pageSize);
            this.sorting = new Grid.Sorting(this.getSortColumns(), appsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
            this.search();
        }
        open() {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                $('#find-application').modal('show');
            });
        }
        getFilters() {
            const filterByApplicationName = typesafe_utility_1.default.propertyOf('FilterByApplicationName');
            const filters = [];
            filters.push(new Grid.StringFilter(filterByApplicationName, 'Application Name'));
            return filters;
        }
        getSortColumns() {
            return [
                { name: 'Application Name', column: 'ApplicationName' }
            ];
        }
    }
    exports.FindApplicationModal = FindApplicationModal;
});
//# sourceMappingURL=find-application-modal.js.map