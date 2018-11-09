define(["require", "exports", "./service-exception"], function (require, exports, service_exception_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HttpClient {
        constructor() {
            this.handleError = (reject) => {
                return function (xhr) {
                    if (xhr.status === 400 && xhr.responseJSON) {
                        reject(new service_exception_1.ServiceException(true, this.mapValidationMessages(xhr.responseJSON)));
                        return;
                    }
                    reject({
                        isBusinessException: false
                    });
                };
            };
        }
        get(uri, data) {
            return this.call('GET', uri, data);
        }
        insert(uri, data) {
            return this.call('POST', uri, data);
        }
        update(uri, data) {
            return this.call('PUT', uri, data);
        }
        delete(uri, data) {
            return this.call('DELETE', uri, data);
        }
        call(method, uri, data) {
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
        mapValidationMessages(serverValidationMessages) {
            if (!serverValidationMessages) {
                return [];
            }
            return serverValidationMessages.map(msg => new service_exception_1.ValidationMessage(msg.Code, msg.Description));
        }
    }
    exports.HttpClient = HttpClient;
});
//# sourceMappingURL=http-client.js.map