import { IFindFilter } from './ifindfilter';
import { FindGroupModal } from '../../viewmodels/find-group-modal';
import { GroupService } from '../../services/group-service';
import * as Models from '../../models/index';

export class FindGroupFilter implements IFindFilter {
    filterType = 'find-filter';
    modalId = 'find-group-modal';
    findButtonText = 'Select Group';
    value = ko.observable('');
    canEdit = true;
    findModal: FindGroupModal;
    selectedGroup: KnockoutObservable<Models.GroupModel | null> = ko.observable();
    displayText: KnockoutComputed<string>;

    constructor(
        public id: string,
        public name: string,
        private groupService: GroupService,
        public permanentValue?: string,
    ) {
        if (permanentValue) {
            this.canEdit = false;
            this.value(permanentValue);
            this.getGroup(permanentValue);
        }
        this.findModal = new FindGroupModal(groupService);
        this.displayText = ko.computed(this.selectedGroupNameComputed, this);
        this.selectedGroup.subscribe(this.selectedGroupComputed, this);
        this.value.subscribe(this.valueChanged);
    }

    async find() {
        try {
            var group = await this.findModal.open();
            this.selectedGroup(group);
        } catch {
            // they closed the modal w/out selecting anything.. so, nothing changed
        }
    }

    getGroup = async (groupId: string) => {
        const group = await this.groupService.getGroup(groupId);
        this.selectedGroup(group);
    }

    private selectedGroupNameComputed = () => {
        if (this.selectedGroup()) {
            return this.selectedGroup().GroupName;
        }
        return '(no group selected)';
    }

    private selectedGroupComputed = (newApp) => {
        if (!newApp) { return; }
        this.value(newApp.GroupId);
    }

    private valueChanged = (newValue) => {
        if (!newValue) {
            this.selectedGroup(null);
        }
    }
}