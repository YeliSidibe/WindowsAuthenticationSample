import { UserService } from '../services/user-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const usersDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'UserName',
    sortDirection: 'ASC',
};

export class FindUserModal extends SearchViewModelBase {
    private resolve: (appModel: Models.UserModel) => void;
    private reject: () => void;
    filters: Grid.Filters;
    sorting: Grid.Sorting;
    isLoading = ko.observable(true);
    users = ko.observableArray([]);
    emptyTableMessage = 'There are no users to display';

    constructor(private userService: UserService) {
        super();
        this.filters = new Grid.Filters(this.getFilters(), this.search);
        this.paging = new Grid.Paging(this.search, usersDefaultSearch.pageNumber, usersDefaultSearch.pageSize);
        this.sorting = new Grid.Sorting(this.getSortColumns(), usersDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
        this.search();
    }

    public open(): Promise<Models.UserModel> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            $('#find-user').modal('show');
        });
    }

    public close = () => {
        this.reject();
        $('#find-user').modal('hide');
    }

    public select = (user: Models.UserModel) => {
        this.resolve(user);
        $('#find-user').modal('hide');
    }

    private search = async () => {
        this.isLoading(true);
        this.users([]);
        try {
            const response = await this.userService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.users(response.Users);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }

    private getFilters() {
        const filterByUserName = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByUserName');
        const filterByFirstName = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByFirstName');
        const filterByLastName = TypesafeUtil.propertyOf<Models.UserSearchRequestModel>('FilterByLastName');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.StringFilter(filterByUserName, 'Username'));
        filters.push(new Grid.StringFilter(filterByFirstName, 'First Name'));
        filters.push(new Grid.StringFilter(filterByLastName, 'Last Name'));
        return filters;
    }

    private getSortColumns() {
        return [
            { name: 'Username', column: 'UserName' },
            { name: 'First Name', column: 'FirstName' },
            { name: 'Last Name', column: 'LastName' },
        ];
    }
}