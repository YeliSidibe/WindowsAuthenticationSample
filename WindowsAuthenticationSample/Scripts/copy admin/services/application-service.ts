import ServerSettings from '../server-settings';
import * as ApiModels from '../models/index';
import { ValidationMessage, ServiceException } from './service-exception';
import { HttpClient } from './http-client';

export class ApplicationService {
    private readonly httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) {
        this.httpClient = new HttpClient();
    }

    getApplication(applicationId: string): Promise<ApiModels.GetApplicationResponseModel> {
        return this.httpClient.get(this.serverSettings.Applications.GetApplication, { applicationId });
    }

    search(model: ApiModels.ApplicationSearchRequestModel): Promise<ApiModels.ApplicationSearchResponseModel> {
        return this.httpClient.get(this.serverSettings.Applications.Search, model);
    }

    updateApplication(model: ApiModels.UpdateApplicationRequestModel): Promise<ApiModels.UpdateApplicationResponseModel> {
        return this.httpClient.update(this.serverSettings.Applications.Update, model);
    }

    insertApplication(model: ApiModels.InsertApplicationRequestModel): Promise<ApiModels.InsertApplicationResponseModel> {
        return this.httpClient.insert(this.serverSettings.Applications.Insert, model);
    }
}