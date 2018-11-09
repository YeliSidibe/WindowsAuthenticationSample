import ServerSettings from '../server-settings';
import * as ApiModels from '../models/index';
import { ValidationMessage, ServiceException } from './service-exception';
import { HttpClient } from './http-client';

export class RoleService {
    private readonly httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) {
        this.httpClient = new HttpClient();
    }

    search(model: ApiModels.RoleSearchRequestModel): Promise<ApiModels.RoleSearchResponseModel> {
        return this.httpClient.get(this.serverSettings.Roles.Search, model);
    }

    getRole(roleId: string): Promise<ApiModels.RoleModel> {
        return this.httpClient.get(this.serverSettings.Roles.GetRole, { roleId });
    }
}