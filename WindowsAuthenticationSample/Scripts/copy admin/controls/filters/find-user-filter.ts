import { IFindFilter } from './ifindfilter';
import { FindUserModal } from '../../viewmodels/find-user-modal';
import { UserService } from '../../services/user-service';
import * as Models from '../../models/index';

export class FindUserFilter implements IFindFilter {
    filterType = 'find-filter';
    modalId = 'find-user-modal';
    findButtonText = 'Select User';
    value = ko.observable('');
    canEdit = true;
    findModal: FindUserModal;
    selectedUser: KnockoutObservable<Models.UserModel | null> = ko.observable();
    displayText: KnockoutComputed<string>;

    constructor(
        public id: string,
        public name: string,
        private userService: UserService,
        public permanentValue?: string,
    ) {
        if (permanentValue) {
            this.canEdit = false;
            this.value(permanentValue);
            this.getUser(permanentValue);
        }
        this.findModal = new FindUserModal(userService);
        this.displayText = ko.computed(this.selectedUserNameComputed, this);
        this.selectedUser.subscribe(this.selectedUserComputed, this);
        this.value.subscribe(this.valueChanged);
    }

    async find() {
        try {
            var user = await this.findModal.open();
            this.selectedUser(user);
        } catch {
            // they closed the modal w/out selecting anything.. so, nothing changed
        }
    }

    getUser = async (userId: string) => {
        const user = await this.userService.getUser(userId);
        this.selectedUser(user);
    }

    private selectedUserNameComputed = () => {
        if (this.selectedUser()) {
            return this.selectedUser().UserName;
        }
        return '(no user selected)';
    }

    private selectedUserComputed = (newApp) => {
        if (!newApp) { return; }
        this.value(newApp.UserId);
    }

    private valueChanged = (newValue) => {
        if (!newValue) {
            this.selectedUser(null);
        }
    }
}