import { GroupService } from '../services/group-service';
import ServerSettings from '../server-settings';
import * as Models from '../models/index';
import { RolesViewModel } from './roles-viewmodel';
import { UsersViewModel } from './users-viewmodel';
import { ServiceException } from '../services/service-exception';
import TypesafeUtil from '../infrastructure/typesafe-utility';
import WindowUtil from '../infrastructure/window-utility';

export class GroupViewModel {
    groupName: KnockoutObservable<string> = ko.observable('');
    description: KnockoutObservable<string> = ko.observable('');
    rolesViewModel: RolesViewModel;
    usersViewModel: UsersViewModel;
    errors = ko.observableArray([]);
    isLoadingGroupInfo = ko.observable(true);
    private groupService: GroupService;
    private groupId: string;

    constructor(serverSettings: ServerSettings) {
        this.groupService = new GroupService(serverSettings);
        this.groupId = WindowUtil.getQueryStringParameter('groupId');
        this.getGroup();
        this.usersViewModel = new UsersViewModel(serverSettings);
        this.rolesViewModel = new RolesViewModel(serverSettings);
    }

    getGroup = async () => {
        this.isLoadingGroupInfo(true);
        try {
            const group = await this.groupService.getGroup(this.groupId);
            this.groupName(group.GroupName);
            this.description(group.Description);
        } catch (ex) {
            this.handleSearchFail(ex);
        }
        this.isLoadingGroupInfo(false);
    }

    private handleSearchFail(ex: any) {
        console.debug('search for groups failed', ex);
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