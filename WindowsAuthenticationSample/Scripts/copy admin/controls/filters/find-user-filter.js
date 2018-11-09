var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../viewmodels/find-user-modal"], function (require, exports, find_user_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindUserFilter {
        constructor(id, name, userService, permanentValue) {
            this.id = id;
            this.name = name;
            this.userService = userService;
            this.permanentValue = permanentValue;
            this.filterType = 'find-filter';
            this.modalId = 'find-user-modal';
            this.findButtonText = 'Select User';
            this.value = ko.observable('');
            this.canEdit = true;
            this.selectedUser = ko.observable();
            this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userService.getUser(userId);
                this.selectedUser(user);
            });
            this.selectedUserNameComputed = () => {
                if (this.selectedUser()) {
                    return this.selectedUser().UserName;
                }
                return '(no user selected)';
            };
            this.selectedUserComputed = (newApp) => {
                if (!newApp) {
                    return;
                }
                this.value(newApp.UserId);
            };
            this.valueChanged = (newValue) => {
                if (!newValue) {
                    this.selectedUser(null);
                }
            };
            if (permanentValue) {
                this.canEdit = false;
                this.value(permanentValue);
                this.getUser(permanentValue);
            }
            this.findModal = new find_user_modal_1.FindUserModal(userService);
            this.displayText = ko.computed(this.selectedUserNameComputed, this);
            this.selectedUser.subscribe(this.selectedUserComputed, this);
            this.value.subscribe(this.valueChanged);
        }
        find() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var user = yield this.findModal.open();
                    this.selectedUser(user);
                }
                catch (_a) {
                    // they closed the modal w/out selecting anything.. so, nothing changed
                }
            });
        }
    }
    exports.FindUserFilter = FindUserFilter;
});
//# sourceMappingURL=find-user-filter.js.map