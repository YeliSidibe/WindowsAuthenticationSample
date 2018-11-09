import ServerSettings from '../server-settings';
import * as ApiModels from '../models/index';
import { ValidationMessage, ServiceException } from './service-exception';
import { HttpClient } from './http-client';

export class GroupService {
    private readonly httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) {
        this.httpClient = new HttpClient();
    }

    search(model: ApiModels.GroupSearchRequestModel): Promise<ApiModels.GroupSearchResponseModel> {
        return this.httpClient.get(this.serverSettings.Groups.Search, model);
    }

    getGroup(groupId: string): Promise<ApiModels.GroupModel> {
        return this.httpClient.get(this.serverSettings.Groups.GetGroup, { groupId });
    }
}