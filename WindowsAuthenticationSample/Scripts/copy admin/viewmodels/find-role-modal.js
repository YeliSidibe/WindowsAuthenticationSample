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
    const rolesDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'RoleName',
        sortDirection: 'ASC',
    };
    class FindRoleModal extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(roleService) {
            super();
            this.roleService = roleService;
            this.isLoading = ko.observable(true);
            this.roles = ko.observableArray([]);
            this.emptyTableMessage = 'There are no roles to display';
            this.close = () => {
                this.reject();
                $('#find-role').modal('hide');
            };
            this.select = (role) => {
                this.resolve(role);
                $('#find-role').modal('hide');
            };
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.roles([]);
                try {
                    const response = yield this.roleService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.roles(response.Roles);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            this.filters = new Grid.Filters(this.getFilters(), this.search);
            this.paging = new Grid.Paging(this.search, rolesDefaultSearch.pageNumber, rolesDefaultSearch.pageSize);
            this.sorting = new Grid.Sorting(this.getSortColumns(), rolesDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
            this.search();
        }
        open() {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                $('#find-role').modal('show');
            });
        }
        getFilters() {
            const filterByRoleName = typesafe_utility_1.default.propertyOf('FilterByRoleName');
            const filters = [];
            filters.push(new Grid.StringFilter(filterByRoleName, 'Role Name'));
            return filters;
        }
        getSortColumns() {
            return [
                { name: 'Role Name', column: 'RoleName' },
            ];
        }
    }
    exports.FindRoleModal = FindRoleModal;
});
//# sourceMappingURL=find-role-modal.js.map