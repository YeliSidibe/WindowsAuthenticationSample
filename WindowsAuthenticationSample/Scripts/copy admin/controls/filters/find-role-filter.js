var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../viewmodels/find-role-modal"], function (require, exports, find_role_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindRoleFilter {
        constructor(id, name, roleService, permanentValue) {
            this.id = id;
            this.name = name;
            this.roleService = roleService;
            this.permanentValue = permanentValue;
            this.filterType = 'find-filter';
            this.modalId = 'find-role-modal';
            this.findButtonText = 'Select Role';
            this.value = ko.observable('');
            this.canEdit = true;
            this.selectedRole = ko.observable();
            this.getRole = (roleId) => __awaiter(this, void 0, void 0, function* () {
                const role = yield this.roleService.getRole(roleId);
                this.selectedRole(role);
            });
            this.selectedRoleNameComputed = () => {
                if (this.selectedRole()) {
                    return this.selectedRole().RoleName;
                }
                return '(no role selected)';
            };
            this.selectedRoleComputed = (newApp) => {
                if (!newApp) {
                    return;
                }
                this.value(newApp.RoleId);
            };
            this.valueChanged = (newValue) => {
                if (!newValue) {
                    this.selectedRole(null);
                }
            };
            if (permanentValue) {
                this.canEdit = false;
                this.value(permanentValue);
                this.getRole(permanentValue);
            }
            this.findModal = new find_role_modal_1.FindRoleModal(roleService);
            this.displayText = ko.computed(this.selectedRoleNameComputed, this);
            this.selectedRole.subscribe(this.selectedRoleComputed, this);
            this.value.subscribe(this.valueChanged);
        }
        find() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var role = yield this.findModal.open();
                    this.selectedRole(role);
                }
                catch (_a) {
                    // they closed the modal w/out selecting anything.. so, nothing changed
                }
            });
        }
    }
    exports.FindRoleFilter = FindRoleFilter;
});
//# sourceMappingURL=find-role-filter.js.map