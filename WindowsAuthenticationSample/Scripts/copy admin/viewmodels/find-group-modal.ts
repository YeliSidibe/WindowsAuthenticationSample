import { GroupService } from '../services/group-service';
import * as Models from '../models/index';
import * as Grid from '../controls/grid-controls';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import { SearchViewModelBase } from './search-viewmodel-base';

const groupsDefaultSearch = {
    pageNumber: 1,
    pageSize: 25,
    sortColumn: 'GroupName',
    sortDirection: 'ASC',
};

export class FindGroupModal extends SearchViewModelBase {
    private resolve: (appModel: Models.GroupModel) => void;
    private reject: () => void;
    filters: Grid.Filters;
    sorting: Grid.Sorting;
    isLoading = ko.observable(true);
    groups = ko.observableArray([]);
    emptyTableMessage = 'There are no groups to display';

    constructor(private groupService: GroupService) {
        super();
        this.filters = new Grid.Filters(this.getFilters(), this.search);
        this.paging = new Grid.Paging(this.search, groupsDefaultSearch.pageNumber, groupsDefaultSearch.pageSize);
        this.sorting = new Grid.Sorting(this.getSortColumns(), groupsDefaultSearch.sortColumn, 'ASC', this.resetPagerThenSearch(this.search));
        this.search();
    }

    public open(): Promise<Models.GroupModel> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            $('#find-group').modal('show');
        });
    }

    public close = () => {
        this.reject();
        $('#find-group').modal('hide');
    }

    public select = (group: Models.GroupModel) => {
        this.resolve(group);
        $('#find-group').modal('hide');
    }

    private search = async () => {
        this.isLoading(true);
        this.groups([]);
        try {
            const response = await this.groupService.search(this.getSearchModel());
            this.paging.rebuild(response.SearchParameters.PageNumber, response.SearchParameters.PageSize, response.MaxRows);
            this.groups(response.Groups);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoading(false);
    }

    private getFilters() {
        const filterByGroupName = TypesafeUtil.propertyOf<Models.GroupSearchRequestModel>('FilterByGroupName');
        const filters: Grid.IFilter[] = [];
        filters.push(new Grid.StringFilter(filterByGroupName, 'Group Name'));
        return filters;
    }

    private getSortColumns() {
        return [
            { name: 'Group Name', column: 'GroupName' },
        ];
    }
}