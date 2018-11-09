import { IFilter } from './filters/ifilter';

export * from './filters/index';

export class Filters {
    public visibleFilters: KnockoutObservableArray<FilterControl>;

    constructor(public allFilters: IFilter[], private reQuery: () => void) {
        this.visibleFilters = ko.observableArray([]);
        const permanentFilters = this.getPermanentFilters(allFilters);
        for (let pFilter of permanentFilters) {
            this.visibleFilters.push(new FilterControl(allFilters, this.onFilterChanged(this.reQuery), pFilter));
        }
        if (permanentFilters.length === 0) {
            this.visibleFilters.push(new FilterControl(allFilters, this.onFilterChanged(this.reQuery)));
        }
        this.rebindAllFilters();
    }

    addFilter = () => {
        const newFilter = new FilterControl(this.allFilters, this.onFilterChanged(this.reQuery));
        this.visibleFilters.push(newFilter);
        this.rebindAllFilters();
    }

    removeFilter = (filter: FilterControl) => {
        filter.dispose();
        this.visibleFilters.remove(filter);
        this.rebindAllFilters();
        this.reQuery();
    }

    public getFilterValues() {
        const values = {};
        for (let filterControl of this.visibleFilters()) {
            const selectedFilter = filterControl.selectedFilter();
            if (!selectedFilter) { continue; }
            const id = selectedFilter.id;
            const value = selectedFilter.value;
            values[id] = ko.unwrap(value);
        }
        return values;
    }

    private getPermanentFilters(allFilters: IFilter[]) {
        return allFilters.filter(f => !f.canEdit);
    }

    private onFilterChanged = (reQuery: () => void) => {
        return () => {
            this.rebindAllFilters();
            reQuery();
        }
    }

    private rebindAllFilters() {
        const selectedFilterIds = this.getCurrentlySelectedFilterIds();
        this.visibleFilters().forEach(control => control.rebindFilters(selectedFilterIds));
    }

    private getCurrentlySelectedFilterIds() {
        return this.visibleFilters()
            .filter(control => control.selectedFilter())
            .map(control => control.selectedFilter().id);
    }
}

class FilterControl {
    public selectedFilter: KnockoutObservable<IFilter>;
    private subscription: KnockoutSubscription;
    private filterValueSubscription: KnockoutSubscription;
    filters: KnockoutObservableArray<IFilter>;
    public isPermanentFilter = false;
    
    constructor(public allFilters: IFilter[], private reQuery: () => void, permanentFilter?: IFilter) {
        this.selectedFilter = ko.observable();
        if (permanentFilter) {
            this.selectedFilter(permanentFilter);
            this.isPermanentFilter = true;
        }
        this.subscription = this.selectedFilter.subscribe(this.selectedFilterChanged);
        this.filters = ko.observableArray([...this.allFilters]);
    }

    dispose() {
        this.subscription.dispose();
        this.disposeFilterSubscription();
    }

    selectedFilterChanged = (newFilter: IFilter) => {
        for (let filter of this.filters()) {
            filter.value('');
        }
        this.reQuery();
        this.disposeFilterSubscription();
        if (newFilter) {
            this.filterValueSubscription = newFilter.value.subscribe(this.reQuery);
        }
    }

    rebindFilters = (filterIdsToOmit: string[]) => {
        const filtersClone = [...this.allFilters];
        const filtered = filtersClone.filter((filter) => {
            let idsToOmit = filterIdsToOmit;
            if (this.selectedFilter()) {
                idsToOmit = filterIdsToOmit.filter(id => this.selectedFilter().id !== id);
            }
            const isFilterInListOfOmitted = idsToOmit.some(filterIdToOmit => filterIdToOmit === filter.id);
            return !isFilterInListOfOmitted;
        });
        this.filters(filtered);
    }

    private disposeFilterSubscription() {
        if (this.filterValueSubscription) {
            this.filterValueSubscription.dispose();
        }
    }
}