import ServerSettings from '../server-settings';
import * as ApiModels from '../models/index';
import { ValidationMessage, ServiceException } from './service-exception';
import { HttpClient } from './http-client';

export class UserService {
    private readonly httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) {
        this.httpClient = new HttpClient();
    }

    search(model: ApiModels.UserSearchRequestModel): Promise<ApiModels.UserSearchResponseModel> {
        return this.httpClient.get(this.serverSettings.Users.Search, model);
    }

    getUser(userId: string): Promise<ApiModels.UserModel> {
        return this.httpClient.get(this.serverSettings.Users.GetUser, { userId });
    }
}