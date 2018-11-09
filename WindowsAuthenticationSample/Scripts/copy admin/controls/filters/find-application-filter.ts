import { IFindFilter } from './ifindfilter';
import { FindApplicationModal } from '../../viewmodels/find-application-modal';
import { ApplicationService } from '../../services/application-service';
import * as Models from '../../models/index';

export class FindApplicationFilter implements IFindFilter {
    filterType = 'find-filter';
    modalId = 'find-application-modal';
    findButtonText = 'Select Application';
    value = ko.observable('');
    canEdit = true;
    findModal: FindApplicationModal;
    selectedApplication: KnockoutObservable<Models.ApplicationModel | null> = ko.observable();
    displayText: KnockoutComputed<string>;

    constructor(
        public id: string,
        public name: string,
        private appService: ApplicationService,
        public permanentValue?: string,
    ) {
        if (permanentValue) {
            this.canEdit = false;
            this.value(permanentValue);
            this.getApplication(permanentValue);
        }
        this.findModal = new FindApplicationModal(appService);
        this.displayText = ko.computed(this.selectedAppNameComputed, this);
        this.selectedApplication.subscribe(this.selectedApplicationComputed, this);
        this.value.subscribe(this.valueChanged);
    }

    async find() {
        try {
            var application = await this.findModal.open();
            this.selectedApplication(application);
        } catch {
            // they closed the modal w/out selecting anything.. so, nothing changed
        }
    }

    getApplication = async (applicationId: string) => {
        const response = await this.appService.getApplication(applicationId);
        this.selectedApplication(<Models.ApplicationModel>response);
    }

    private selectedAppNameComputed = () => {
        if (this.selectedApplication()) {
            return this.selectedApplication().ApplicationName;
        }
        return '(no application selected)';
    }

    private selectedApplicationComputed = (newApp) => {
        if (!newApp) { return; }
        this.value(newApp.ApplicationId);
    }

    private valueChanged = (newValue) => {
        if (!newValue) {
            this.selectedApplication(null);
        }
    }
}