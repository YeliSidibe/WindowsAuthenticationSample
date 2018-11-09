import { ServiceException } from '../services/service-exception';

export class SearchViewModelBase
{
    isLoading = ko.observable(true);
    errors = ko.observableArray([]);
    protected handleException(exception: any) {
        console.debug('An exception occured and is being handled', exception);
        if (exception instanceof ServiceException)
        {
            if (exception.isBusinessException && exception.validationMessages.length > 0)
            {
                exception.validationsMessages.foreach(msg => this.errors.push(msg));                
            }
        }
    }
}