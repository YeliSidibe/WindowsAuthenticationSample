import * as Models from '../models/index';
import { HttpClient } from '../utility/http-client';
import ServerSettings from '../ServerSettings';

export class ApplicationService {
    private httpClient: HttpClient;

    constructor(private serverSettings: ServerSettings) { this.httpClient = new HttpClient(); }

    search(): Promise<Models.ApplicationModel[]>
    {
        return this.httpClient.Get(this.serverSettings.Applications.Search);
    }
}