define(["require", "exports", "./filters/index"], function (require, exports, index_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(index_1);
    class Filters {
        constructor(allFilters, reQuery) {
            this.allFilters = allFilters;
            this.reQuery = reQuery;
            this.addFilter = () => {
                const newFilter = new FilterControl(this.allFilters, this.onFilterChanged(this.reQuery));
                this.visibleFilters.push(newFilter);
                this.rebindAllFilters();
            };
            this.removeFilter = (filter) => {
                filter.dispose();
                this.visibleFilters.remove(filter);
                this.rebindAllFilters();
                this.reQuery();
            };
            this.onFilterChanged = (reQuery) => {
                return () => {
                    this.rebindAllFilters();
                    reQuery();
                };
            };
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
        getFilterValues() {
            const values = {};
            for (let filterControl of this.visibleFilters()) {
                const selectedFilter = filterControl.selectedFilter();
                if (!selectedFilter) {
                    continue;
                }
                const id = selectedFilter.id;
                const value = selectedFilter.value;
                values[id] = ko.unwrap(value);
            }
            return values;
        }
        getPermanentFilters(allFilters) {
            return allFilters.filter(f => !f.canEdit);
        }
        rebindAllFilters() {
            const selectedFilterIds = this.getCurrentlySelectedFilterIds();
            this.visibleFilters().forEach(control => control.rebindFilters(selectedFilterIds));
        }
        getCurrentlySelectedFilterIds() {
            return this.visibleFilters()
                .filter(control => control.selectedFilter())
                .map(control => control.selectedFilter().id);
        }
    }
    exports.Filters = Filters;
    class FilterControl {
        constructor(allFilters, reQuery, permanentFilter) {
            this.allFilters = allFilters;
            this.reQuery = reQuery;
            this.isPermanentFilter = false;
            this.selectedFilterChanged = (newFilter) => {
                for (let filter of this.filters()) {
                    filter.value('');
                }
                this.reQuery();
                this.disposeFilterSubscription();
                if (newFilter) {
                    this.filterValueSubscription = newFilter.value.subscribe(this.reQuery);
                }
            };
            this.rebindFilters = (filterIdsToOmit) => {
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
            };
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
        disposeFilterSubscription() {
            if (this.filterValueSubscription) {
                this.filterValueSubscription.dispose();
            }
        }
    }
});
//# sourceMappingURL=filters.js.map