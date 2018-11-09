import ServerSettings from '../server-settings';
import * as ApiModels from '../models/index';
import { ValidationMessage, ServiceException } from './service-exception';
import { HttpClient } from './http-client';

export class OperationService {
    private readonly httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) {
        this.httpClient = new HttpClient();
    }

    search(model: ApiModels.OperationSearchRequestModel): Promise<ApiModels.OperationSearchResponseModel> {
        return this.httpClient.get(this.serverSettings.Operations.Search, model);
    }

    getOperation(operationId: string): Promise<ApiModels.OperationModel> {
        return this.httpClient.get(this.serverSettings.Operations.GetOperation, { operationId });
    }
}