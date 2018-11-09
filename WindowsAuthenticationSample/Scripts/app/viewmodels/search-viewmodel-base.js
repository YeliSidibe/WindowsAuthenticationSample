define(["require", "exports", '../services/service-exception'], function (require, exports, service_exception_1) {
    "use strict";
    class SearchViewModelBase {
        constructor() {
            this.isLoading = ko.observable(true);
            this.errors = ko.observableArray([]);
        }
        handleException(exception) {
            console.debug('An exception occured and is being handled', exception);
            if (exception instanceof service_exception_1.ServiceException) {
                if (exception.isBusinessException && exception.validationMessages.length > 0) {
                    exception.validationsMessages.foreach(msg => this.errors.push(msg));
                }
            }
        }
    }
    exports.SearchViewModelBase = SearchViewModelBase;
});
