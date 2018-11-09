import ServerSettings from '../ServerSettings';
import { ApplicationService } from '../services/application-service';
import { SearchViewModelBase } from './search-viewmodel-base';

export class ApplicationViewModel extends SearchViewModelBase{        
    private service : ApplicationService;
    private applications = ko.observableArray([]);
    constructor(_serverSettings: ServerSettings)
    {       
        super();
        this.service = new ApplicationService(_serverSettings);
        this.search();
    }

    private search = async () => {
        // show spinner
        this.isLoading(true);
        // Get applications
        this.applications([]); // Clear applicaton list
        try {
            const response = await this.service.search();
            this.applications(response);
        }
        catch (e)
        {
            this.handleException(e);
        }
        // hide spinner
        this.isLoading(false);
    }
}
