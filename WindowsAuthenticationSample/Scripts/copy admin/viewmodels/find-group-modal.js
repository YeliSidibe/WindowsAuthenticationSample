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
    const groupsDefaultSearch = {
        pageNumber: 1,
        pageSize: 25,
        sortColumn: 'GroupName',
        sortDirection: 'ASC',
    };
    class FindGroupModal extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(groupService) {
            super();
            this.groupService = groupService;
            this.isLoading = ko.observable(true);
            this.groups = ko.observableArray([]);
            this.emptyTableMessage = 'There are no groups to display';
            this.close = () => {
                this.reject();
                $('#find-group').modal('hide');
            };
            this.select = (group) => {
                this.resolve(group);
                $('#find-group').modal('hide');
            };
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.groups([]);
                try {
                    const response = yield this.groupService.search(this.getSearchModel());
                    this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
                    this.groups(response.Groups);
                }
                catch (ex) {
                    this.handleSearchFail(ex);
                }
                this.isLoading(false);
            });
            this.filters = new Grid.Filters(this.getFilters(), this.search);
            this.paging = new Grid.Paging(this.search, groupsDefaultSearch.pageNumber, groupsDefaultSearch.pageSize);
            this.sorting = new Grid.Sorting(this.getSortColumns(), groupsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
            this.search();
        }
        open() {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                $('#find-group').modal('show');
            });
        }
        getFilters() {
            const filterByGroupName = typesafe_utility_1.default.propertyOf('FilterByGroupName');
            const filters = [];
            filters.push(new Grid.StringFilter(filterByGroupName, 'Group Name'));
            return filters;
        }
        getSortColumns() {
            return [
                { name: 'Group Name', column: 'GroupName' },
            ];
        }
    }
    exports.FindGroupModal = FindGroupModal;
});
//# sourceMappingURL=find-group-modal.js.map