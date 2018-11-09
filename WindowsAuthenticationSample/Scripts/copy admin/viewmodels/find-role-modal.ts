import { RoleService } from '../services/role-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const rolesDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'RoleName',
    sortDirection: 'ASC',
};

export class FindRoleModal extends SearchViewModelBase {
    private resolve: (appModel: Models.RoleModel) => void;
    private reject: () => void;
    filters: Grid.Filters;
    sorting: Grid.Sorting;
    isLoading = ko.observable(true);
    roles = ko.observableArray([]);
    emptyTableMessage = 'There are no roles to display';

    constructor(private roleService: RoleService) {
        super();
        this.filters = new Grid.Filters(this.getFilters(), this.search);
        this.paging = new Grid.Paging(this.search, rolesDefaultSearch.pageNumber, rolesDefaultSearch.pageSize);
        this.sorting = new Grid.Sorting(this.getSortColumns(), rolesDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
        this.search();
    }

    public open(): Promise<Models.RoleModel> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            $('#find-role').modal('show');
        });
    }

    public close = () => {
        this.reject();
        $('#find-role').modal('hide');
    }

    public select = (role: Models.RoleModel) => {
        this.resolve(role);
        $('#find-role').modal('hide');
    }

    private search = async () => {
        this.isLoading(true);
        this.roles([]);
        try {
            const response = await this.roleService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.roles(response.Roles);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }

    private getFilters() {
        const filterByRoleName = TypesafeUtil.propertyOf<Models.RoleSearchRequestModel>('FilterByRoleName');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.StringFilter(filterByRoleName, 'Role Name'));
        return filters;
    }

    private getSortColumns() {
        return [
            { name: 'Role Name', column: 'RoleName' },
        ];
    }
}