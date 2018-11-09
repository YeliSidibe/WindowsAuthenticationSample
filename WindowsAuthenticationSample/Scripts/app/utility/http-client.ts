import { ValidationMessages,ServiceException } from '../services/service-exception';
type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class HttpClient
{
    constructor() { }

    Get<T>(uri: string,data?:T) : Promise<T>
    {
        return this.call<T>('GET',uri, data);
    }

    private call<T>(method: HttpMethods,uri: string, data?: T): Promise<T> {
        return new Promise((resolve, reject) => {
            $.ajax({
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                method: method,
                url: uri,
                data: data,
                success: resolve,
                error: this.handleError(reject)                
            });
        });
    }

    private handleError = (reject) => {
        return function(xhr?:any) : void
        {
            if (xhr.status == 400 && xhr.responseJSON)
            {
                reject(new ServiceException(true, this.mapValidationMessage(xhr.responseJSON)));
                return;                  
            }

            reject({isBusinessException : false});
        }
    }

    private mapValidationMessage = (serverValidationMessages : any[]) =>
    {
        if (!serverValidationMessages) return []
        else
        {
            return serverValidationMessages.map(msg => new ValidationMessages(msg.code,msg.description));
        }
    }

}