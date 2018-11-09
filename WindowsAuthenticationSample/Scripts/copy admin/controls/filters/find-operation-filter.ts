import { IFindFilter } from './ifindfilter';
import { FindOperationModal } from '../../viewmodels/find-operation-modal';
import { OperationService } from '../../services/operation-service';
import * as Models from '../../models/index';

export class FindOperationFilter implements IFindFilter {
    filterType = 'find-filter';
    modalId = 'find-operation-modal';
    findButtonText = 'Select Operation';
    value = ko.observable('');
    canEdit = true;
    findModal: FindOperationModal;
    selectedOperation: KnockoutObservable<Models.OperationModel | null> = ko.observable();
    displayText: KnockoutComputed<string>;

    constructor(
        public id: string,
        public name: string,
        private operationService: OperationService,
        public permanentValue?: string,
    ) {
        if (permanentValue) {
            this.canEdit = false;
            this.value(permanentValue);
            this.getOperation(permanentValue);
        }
        this.findModal = new FindOperationModal(operationService);
        this.displayText = ko.computed(this.selectedOperationNameComputed, this);
        this.selectedOperation.subscribe(this.selectedOperationComputed, this);
        this.value.subscribe(this.valueChanged);
    }

    async find() {
        try {
            var operation = await this.findModal.open();
            this.selectedOperation(operation);
        } catch {
            // they closed the modal w/out selecting anything.. so, nothing changed
        }
    }

    getOperation = async (operationId: string) => {
        const operation = await this.operationService.getOperation(operationId);
        this.selectedOperation(operation);
    }

    private selectedOperationNameComputed = () => {
        if (this.selectedOperation()) {
            return this.selectedOperation().OperationName;
        }
        return '(no operation selected)';
    }

    private selectedOperationComputed = (newApp: Models.OperationModel) => {
        if (!newApp) { return; }
        this.value(newApp.OperationId);
    }

    private valueChanged = (newValue) => {
        if (!newValue) {
            this.selectedOperation(null);
        }
    }
}