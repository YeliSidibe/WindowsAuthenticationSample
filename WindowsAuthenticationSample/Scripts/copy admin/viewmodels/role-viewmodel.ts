import { RoleService } from '../services/role-service';
import ServerSettings from '../server-settings';
import * as Models from '../models/index';
import { OperationsViewModel } from './operations-viewmodel';
import { UsersViewModel } from './users-viewmodel';
import { GroupsViewModel } from './groups-viewmodel';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';

export class RoleViewModel {
    roleName: KnockoutObservable<string> = ko.observable('');
    description: KnockoutObservable<string> = ko.observable('');
    operationsViewModel: OperationsViewModel;
    usersViewModel: UsersViewModel;
    groupsViewModel: GroupsViewModel;
    errors = ko.observableArray([]);
    isLoadingRoleInfo = ko.observable(true);
    private roleService: RoleService;
    private roleId: string;

    constructor(serverSettings: ServerSettings) {
        this.roleService = new RoleService(serverSettings);
        this.roleId = WindowUtil.getQueryStringParameter('roleId');
        this.getRole();
        this.usersViewModel = new UsersViewModel(serverSettings);
        this.operationsViewModel = new OperationsViewModel(serverSettings);
        this.groupsViewModel = new GroupsViewModel(serverSettings);
    }

    getRole = async () => {
        this.isLoadingRoleInfo(true);
        try {
            const userInfo = await this.roleService.getRole(this.roleId);
            this.roleName(userInfo.RoleName);
            this.description(userInfo.Description);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoadingRoleInfo(false);
    }

    private handleSearchFail(ex: any) {
        console.debug('search for roles failed', ex);
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