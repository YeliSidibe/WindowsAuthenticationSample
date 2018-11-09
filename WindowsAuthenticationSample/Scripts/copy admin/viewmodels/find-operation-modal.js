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
    const operationsDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'OperationName',
        sortDirection: 'ASC',
    };
    class FindOperationModal extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(operationService) {
            super();
            this.operationService = operationService;
            this.isLoading = ko.observable(true);
            this.operations = ko.observableArray([]);
            this.emptyTableMessage = 'There are no operations to display';
            this.close = () => {
                this.reject();
                $('#find-operation').modal('hide');
            };
            this.select = (operation) => {
                this.resolve(operation);
                $('#find-operation').modal('hide');
            };
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.operations([]);
                try {
                    const response = yield this.operationService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.operations(response.Operations);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            this.filters = new Grid.Filters(this.getFilters(), this.search);
            this.paging = new Grid.Paging(this.search, operationsDefaultSearch.pageNumber, operationsDefaultSearch.pageSize);
            this.sorting = new Grid.Sorting(this.getSortColumns(), operationsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
            this.search();
        }
        open() {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                $('#find-operation').modal('show');
            });
        }
        getFilters() {
            const filterByOperationName = typesafe_utility_1.default.propertyOf('FilterByOperationName');
            const filters = [];
            filters.push(new Grid.StringFilter(filterByOperationName, 'Operation Name'));
            return filters;
        }
        getSortColumns() {
            return [
                { name: 'Operation Name', column: 'OperationName' },
            ];
        }
    }
    exports.FindOperationModal = FindOperationModal;
});
//# sourceMappingURL=find-operation-modal.js.map