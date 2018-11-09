define(["require", "exports", '../services/service-exception'], function (require, exports, service_exception_1) {
    "use strict";
    class HttpClient {
        constructor() {
            this.handleError = (reject) => {
                return function (xhr) {
                    if (xhr.status == 400 && xhr.responseJSON) {
                        reject(new service_exception_1.ServiceException(true, this.mapValidationMessage(xhr.responseJSON)));
                        return;
                    }
                    reject({ isBusinessException: false });
                };
            };
            this.mapValidationMessage = (serverValidationMessages) => {
                if (!serverValidationMessages)
                    return [];
                else {
                    return serverValidationMessages.map(msg => new service_exception_1.ValidationMessages(msg.code, msg.description));
                }
            };
        }
        Get(uri, data) {
            return this.call('GET', uri, data);
        }
        call(method, uri, data) {
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
    }
    exports.HttpClient = HttpClient;
});
