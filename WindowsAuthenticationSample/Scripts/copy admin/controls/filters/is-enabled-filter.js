define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IsEnabledFilter {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            this.filterType = 'is-enabled-filter';
            this.values = ['TRUE', 'FALSE'];
            this.value = ko.observable('');
            this.canEdit = true;
        }
    }
    exports.IsEnabledFilter = IsEnabledFilter;
});
//# sourceMappingURL=is-enabled-filter.js.map