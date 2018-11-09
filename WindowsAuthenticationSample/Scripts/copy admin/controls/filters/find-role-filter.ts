import { IFindFilter } from './ifindfilter';
import { FindRoleModal } from '../../viewmodels/find-role-modal';
import { RoleService } from '../../services/role-service';
import * as Models from '../../models/index';

export class FindRoleFilter implements IFindFilter {
    filterType = 'find-filter';
    modalId = 'find-role-modal';
    findButtonText = 'Select Role';
    value = ko.observable('');
    canEdit = true;
    findModal: FindRoleModal;
    selectedRole: KnockoutObservable<Models.RoleModel | null> = ko.observable();
    displayText: KnockoutComputed<string>;

    constructor(
        public id: string,
        public name: string,
        private roleService: RoleService,
        public permanentValue?: string,
    ) {
        if (permanentValue) {
            this.canEdit = false;
            this.value(permanentValue);
            this.getRole(permanentValue);
        }
        this.findModal = new FindRoleModal(roleService);
        this.displayText = ko.computed(this.selectedRoleNameComputed, this);
        this.selectedRole.subscribe(this.selectedRoleComputed, this);
        this.value.subscribe(this.valueChanged);
    }

    async find() {
        try {
            var role = await this.findModal.open();
            this.selectedRole(role);
        } catch {
            // they closed the modal w/out selecting anything.. so, nothing changed
        }
    }

    getRole = async (roleId: string) => {
        const role = await this.roleService.getRole(roleId);
        this.selectedRole(role);
    }

    private selectedRoleNameComputed = () => {
        if (this.selectedRole()) {
            return this.selectedRole().RoleName;
        }
        return '(no role selected)';
    }

    private selectedRoleComputed = (newApp: Models.RoleModel) => {
        if (!newApp) { return; }
        this.value(newApp.RoleId);
    }

    private valueChanged = (newValue) => {
        if (!newValue) {
            this.selectedRole(null);
        }
    }
}