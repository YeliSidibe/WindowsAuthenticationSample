import { OperationService } from '../services/operation-service';
import ServerSettings from '../server-settings';
import * as Models from '../models/index';
import { RolesViewModel } from './roles-viewmodel';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';

export class OperationViewModel {
    operationName: KnockoutObservable<string> = ko.observable('');
    description: KnockoutObservable<string> = ko.observable('');
    rolesViewModel: RolesViewModel;
    errors = ko.observableArray([]);
    isLoadingOperationInfo = ko.observable(true);
    private operationService: OperationService;
    private operationId: string;

    constructor(serverSettings: ServerSettings) {
        this.operationService = new OperationService(serverSettings);
        this.operationId = WindowUtil.getQueryStringParameter('operationId');
        this.getOperation();
        this.rolesViewModel = new RolesViewModel(serverSettings);
    }

    getOperation = async () => {
        this.isLoadingOperationInfo(true);
        try {
            const operation = await this.operationService.getOperation(this.operationId);
            this.operationName(operation.OperationName);
            this.description(operation.Description);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoadingOperationInfo(false);
    }

    private handleSearchFail(ex: any) {
        console.debug('search for operations failed', ex);
        this.errors([]);
        if (ex instanceof ServiceException) {
            if (ex.isBusinessException && ex.validationMessages.length > 0) {
                ex.validationMessages.forEach(msg => this.errors.push(msg));
                return;
            }
        }
        this.errors.push({ Description: 'There was an error on the server.' });
    }
}