var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../services/application-service", "../services/user-service", "../controls/grid-controls", "../infrastructure/typesafe-utility", "../infrastructure/window-utility", "./search-viewmodel-base"], function (require, exports, application_service_1, user_service_1, Grid, typesafe_utility_1, window_utility_1, search_viewmodel_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appsDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'ApplicationName',
        sortDirection: 'ASC',
        filterByApplicationName: null,
        filterByUserId: null,
    };
    class ApplicationsViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(serverSettings) {
            super();
            this.applications = ko.observableArray([]);
            this.emptyTableMessage = 'There are no applications to display';
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
            const resetPagerThenSearch = this.resetPagerThenSearch(this.search);
            this.appService = new application_service_1.ApplicationService(serverSettings);
            this.userService = new user_service_1.UserService(serverSettings);
            this.sorting = new Grid.Sorting(this.getSortColumns(), appsDefaultSearch.sortColumn, 'ASC', resetPagerThenSearch);
            this.filters = new Grid.Filters(this.getFilters(), resetPagerThenSearch);
            this.paging = new Grid.Paging(this.search, appsDefaultSearch.pageNumber, appsDefaultSearch.pageSize);
            this.actions = new Grid.Actions([{ name: 'Create New Application', action: this.createApplicationModal }]);
            this.search();
        }
        createApplicationModal() {
            return;
        }
        getSortColumns() {
            return [
                { name: 'Application Name', column: 'ApplicationName' }
            ];
        }
        getFilters() {
            const filterByApplicationName = typesafe_utility_1.default.propertyOf('FilterByApplicationName');
            const filterByUserId = typesafe_utility_1.default.propertyOf('FilterByUserId');
            const userIdQueryString = window_utility_1.default.getQueryStringParameter('userId');
            const filters = [];
            filters.push(new Grid.FindUserFilter(filterByUserId, 'User', this.userService, userIdQueryString));
            filters.push(new Grid.StringFilter(filterByApplicationName, 'Application Name'));
            return filters;
        }
    }
    exports.ApplicationsViewModel = ApplicationsViewModel;
});
//# sourceMappingURL=applications-viewmodel.js.map