import { ValidationMessage, ServiceException } from './service-exception';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class HttpClient {
    public get<T>(uri: string, data?: any): Promise<T> {
        return this.call<T>('GET', uri, data);
    }

    public insert<T>(uri: string, data?: any): Promise<T> {
        return this.call<T>('POST', uri, data);
    }

    public update<T>(uri: string, data?: any): Promise<T> {
        return this.call<T>('PUT', uri, data);
    }

    public delete<T>(uri: string, data?: any): Promise<T> {
        return this.call<T>('DELETE', uri, data);
    }

    private call<T>(method: HttpMethods, uri: string, data?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                method: method,
                url: uri,
                data: data,
                success: resolve,
                error: this.handleError(reject),
            });
        });
    }

    private handleError = (reject) => {
        return function (xhr?: any): void {
            if (xhr.status === 400 && xhr.responseJSON) {
                reject(new ServiceException(true, this.mapValidationMessages(xhr.responseJSON)));
                return;
            }
            reject({
                isBusinessException: false
            });
        }
    }

    private mapValidationMessages(serverValidationMessages: any[]) {
        if (!serverValidationMessages) {
            return [];
        }
        return serverValidationMessages.map(msg => new ValidationMessage(msg.Code, msg.Description));
    }
}