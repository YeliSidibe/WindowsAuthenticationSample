import { ApplicationService } from '../services/application-service';
import ServerSettings from '../server-settings';
import * as Models from '../models/index';
import { OperationsViewModel } from './operations-viewmodel';
import { GroupsViewModel } from './groups-viewmodel';
import { RolesViewModel } from './roles-viewmodel';
import { UsersViewModel } from './users-viewmodel';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';

export class ApplicationViewModel {
    applicationId: string;
    applicationName = ko.observable('');
    description = ko.observable('');
    operationsViewModel: OperationsViewModel;
    groupsViewModel: GroupsViewModel;
    rolesViewModel: RolesViewModel;
    usersViewModel: UsersViewModel;
    private appService: ApplicationService;
    private isLoadingAppInfo = ko.observable(true);

    constructor(serverSettings: ServerSettings) {
        this.appService = new ApplicationService(serverSettings);
        this.applicationId = WindowUtil.getQueryStringParameter('applicationId');
        this.getAppInfo();
        this.operationsViewModel = new OperationsViewModel(serverSettings);
        this.groupsViewModel = new GroupsViewModel(serverSettings);
        this.rolesViewModel = new RolesViewModel(serverSettings);
        this.usersViewModel = new UsersViewModel(serverSettings);
    }

    getAppInfo = async () => {
        this.isLoadingAppInfo(true);
        const appInfo = await this.appService.getApplication(this.applicationId);
        this.applicationName(appInfo.ApplicationName);
        this.description(appInfo.Description);
        this.isLoadingAppInfo(false);
    }
}