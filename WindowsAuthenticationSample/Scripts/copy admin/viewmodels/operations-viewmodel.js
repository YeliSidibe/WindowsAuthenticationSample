var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/operation-service", "../services/role-service", "../services/application-service", "../controls/grid-controls", "../infrastructure/typesafe-utility", "../infrastructure/window-utility", "./search-viewmodel-base"], function (require, exports, operation_service_1, role_service_1, application_service_1, Grid, typesafe_utility_1, window_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultSearchParams = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'OperationName',
        sortDirection: 'ASC',
        filterByApplicationId: null,
        filterByOperationId: null,
    };
    class OperationsViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(serverSettings) {
            super();
            this.operations = ko.observableArray([]);
            this.emptyTableMessage = 'There are no operations to display';
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
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
            const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
            this.operationService = new operation_service_1.OperationService(serverSettings);
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.roleService = new role_service_1.RoleService(serverSettings);
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
        getSortColumn() {
            return [
                { name: 'Operation Name', column: 'OperationName' },
                { name: 'Application Name', column: 'ApplicationName' },
            ];
        }
        getFilters() {
            const filterByApplicationId = typesafe_utility_1.default.propertyOf('FilterByApplicationId');
            const filterByRoleId = typesafe_utility_1.default.propertyOf('FilterByRoleId');
            const filters = [];
            const appIdQueryString = window_utility_1.default.getQueryStringParameter('applicationId');
            const roleIdQueryString = window_utility_1.default.getQueryStringParameter('roleId');
            filters.push(new Grid.FindApplicationFilter(filterByApplicationId, 'Application', this.appService, appIdQueryString));
            filters.push(new Grid.FindRoleFilter(filterByRoleId, 'Role', this.roleService, roleIdQueryString));
            return filters;
        }
    }
    exports.OperationsViewModel = OperationsViewModel;
});
//# sourceMappingURL=operations-viewmodel.js.map