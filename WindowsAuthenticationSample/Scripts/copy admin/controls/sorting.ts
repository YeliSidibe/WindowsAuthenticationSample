export interface ISortColumn {
    name: string;
    column: string;
}

export type SortDirections = 'ASC' | 'DESC';

export class Sorting {
    observableSortColumns: KnockoutObservableArray<ISortColumn>;
    observableSortColumn: KnockoutObservable<string>;
    observableSortDirection: KnockoutObservable<SortDirections>;

    constructor(
        sortColumns: ISortColumn[],
        sortColumnInit: string,
        sortDirectionInit: SortDirections,
        public onSortChanged: () => void) {

        this.observableSortDirection = ko.observable(sortDirectionInit);
        this.observableSortColumn = ko.observable(sortColumnInit);
        this.observableSortColumns = ko.observableArray(sortColumns || []);
    }

    get sortColumn() {
        return this.observableSortColumn();
    }

    get sortDirection() {
        return this.observableSortDirection();
    }

    onSortItemClick = (sortValue: ISortColumn) => {
        this.observableSortColumn(sortValue.column);
        this.onSortChanged();
    }

    toggleSortDirection = () => {
        this.observableSortDirection(this.observableSortDirection() === 'ASC' ? 'DESC' : 'ASC');
        this.onSortChanged();
    }
}