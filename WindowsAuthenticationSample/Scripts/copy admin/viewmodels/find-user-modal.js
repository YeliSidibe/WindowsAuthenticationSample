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
    const usersDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'UserName',
        sortDirection: 'ASC',
    };
    class FindUserModal extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(userService) {
            super();
            this.userService = userService;
            this.isLoading = ko.observable(true);
            this.users = ko.observableArray([]);
            this.emptyTableMessage = 'There are no users to display';
            this.close = () => {
                this.reject();
                $('#find-user').modal('hide');
            };
            this.select = (user) => {
                this.resolve(user);
                $('#find-user').modal('hide');
            };
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.users([]);
                try {
                    const response = yield this.userService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.users(response.Users);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            this.filters = new Grid.Filters(this.getFilters(), this.search);
            this.paging = new Grid.Paging(this.search, usersDefaultSearch.pageNumber, usersDefaultSearch.pageSize);
            this.sorting = new Grid.Sorting(this.getSortColumns(), usersDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
            this.search();
        }
        open() {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                $('#find-user').modal('show');
            });
        }
        getFilters() {
            const filterByUserName = typesafe_utility_1.default.propertyOf('FilterByUserName');
            const filterByFirstName = typesafe_utility_1.default.propertyOf('FilterByFirstName');
            const filterByLastName = typesafe_utility_1.default.propertyOf('FilterByLastName');
            const filters = [];
            filters.push(new Grid.StringFilter(filterByUserName, 'Username'));
            filters.push(new Grid.StringFilter(filterByFirstName, 'First Name'));
            filters.push(new Grid.StringFilter(filterByLastName, 'Last Name'));
            return filters;
        }
        getSortColumns() {
            return [
                { name: 'Username', column: 'UserName' },
                { name: 'First Name', column: 'FirstName' },
                { name: 'Last Name', column: 'LastName' },
            ];
        }
    }
    exports.FindUserModal = FindUserModal;
});
//# sourceMappingURL=find-user-modal.js.map