var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../viewmodels/find-group-modal"], function (require, exports, find_group_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindGroupFilter {
        constructor(id, name, groupService, permanentValue) {
            this.id = id;
            this.name = name;
            this.groupService = groupService;
            this.permanentValue = permanentValue;
            this.filterType = 'find-filter';
            this.modalId = 'find-group-modal';
            this.findButtonText = 'Select Group';
            this.value = ko.observable('');
            this.canEdit = true;
            this.selectedGroup = ko.observable();
            this.getGroup = (groupId) => __awaiter(this, void 0, void 0, function* () {
                const group = yield this.groupService.getGroup(groupId);
                this.selectedGroup(group);
            });
            this.selectedGroupNameComputed = () => {
                if (this.selectedGroup()) {
                    return this.selectedGroup().GroupName;
                }
                return '(no group selected)';
            };
            this.selectedGroupComputed = (newApp) => {
                if (!newApp) {
                    return;
                }
                this.value(newApp.GroupId);
            };
            this.valueChanged = (newValue) => {
                if (!newValue) {
                    this.selectedGroup(null);
                }
            };
            if (permanentValue) {
                this.canEdit = false;
                this.value(permanentValue);
                this.getGroup(permanentValue);
            }
            this.findModal = new find_group_modal_1.FindGroupModal(groupService);
            this.displayText = ko.computed(this.selectedGroupNameComputed, this);
            this.selectedGroup.subscribe(this.selectedGroupComputed, this);
            this.value.subscribe(this.valueChanged);
        }
        find() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var group = yield this.findModal.open();
                    this.selectedGroup(group);
                }
                catch (_a) {
                    // they closed the modal w/out selecting anything.. so, nothing changed
                }
            });
        }
    }
    exports.FindGroupFilter = FindGroupFilter;
});
//# sourceMappingURL=find-group-filter.js.map