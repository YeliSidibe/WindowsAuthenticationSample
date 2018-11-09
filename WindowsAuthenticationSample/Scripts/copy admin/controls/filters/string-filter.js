define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringFilter {
        constructor(id, name, permanentValue) {
            this.id = id;
            this.name = name;
            this.filterType = 'string-filter';
            this.value = ko.observable('');
            this.canEdit = true;
            if (permanentValue) {
                this.value(permanentValue);
                this.canEdit = false;
            }
            this.value.extend({ rateLimit: 500 });
        }
    }
    exports.StringFilter = StringFilter;
});
//# sourceMappingURL=string-filter.js.map