import { UserService } from '../services/user-service';
import ServerSettings from '../server-settings';
import * as Models from '../models/index';
import { GroupsViewModel } from './groups-viewmodel';
import { RolesViewModel } from './roles-viewmodel';
import { ApplicationsViewModel } from './applications-viewmodel';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';

export class UserViewModel {
    userInfo: KnockoutObservable<Models.UserModel> = ko.observable();
    groupsViewModel: GroupsViewModel;
    rolesViewModel: RolesViewModel;
    applicationsViewModel: ApplicationsViewModel;
    errors = ko.observableArray([]);
    private userService: UserService;
    private isLoadingAppInfo = ko.observable(true);
    private userId: string;

    constructor(serverSettings: ServerSettings) {
        this.userService = new UserService(serverSettings);
        this.userId = WindowUtil.getQueryStringParameter('userId');
        this.getUserInfo();
        this.groupsViewModel = new GroupsViewModel(serverSettings);
        this.rolesViewModel = new RolesViewModel(serverSettings);
        this.applicationsViewModel = new ApplicationsViewModel(serverSettings);
    }

    getUserInfo = async () => {
        this.isLoadingAppInfo(true);
        try {
            const userInfo = await this.userService.getUser(this.userId);
            this.userInfo(userInfo);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoadingAppInfo(false);
    }

    private handleSearchFail(ex: any) {
        console.debug('search for user failed', ex);
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