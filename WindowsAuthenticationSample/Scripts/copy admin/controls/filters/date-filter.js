define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DateFilter {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            this.filterType = 'date-filter';
            this.value = ko.observable('');
            this.canEdit = true;
            this.value.extend({ rateLimit: 500 });
        }
    }
    exports.DateFilter = DateFilter;
});
//# sourceMappingURL=date-filter.js.map