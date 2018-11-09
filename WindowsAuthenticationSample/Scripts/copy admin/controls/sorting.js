define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sorting {
        constructor(sortColumns, sortColumnInit, sortDirectionInit, onSortChanged) {
            this.onSortChanged = onSortChanged;
            this.onSortItemClick = (sortValue) => {
                this.observableSortColumn(sortValue.column);
                this.onSortChanged();
            };
            this.toggleSortDirection = () => {
                this.observableSortDirection(this.observableSortDirection() === 'ASC' ? 'DESC' : 'ASC');
                this.onSortChanged();
            };
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
    }
    exports.Sorting = Sorting;
});
//# sourceMappingURL=sorting.js.map