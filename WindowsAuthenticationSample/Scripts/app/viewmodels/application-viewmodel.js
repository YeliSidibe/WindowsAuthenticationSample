var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
define(["require", "exports", '../services/application-service', './search-viewmodel-base'], function (require, exports, application_service_1, search_viewmodel_base_1) {
    "use strict";
    class ApplicationViewModel extends search_viewmodel_base_1.SearchViewModelBase {
        constructor(_serverSettings) {
            super();
            this.applications = ko.observableArray([]);
            this.search = () => __awaiter(this, void 0, void 0, function* () {
                this.isLoading(true);
                this.applications([]);
                try {
                    const response = yield this.service.search();
                    this.applications(response);
                }
                catch (e) {
                    this.handleException(e);
                }
                this.isLoading(false);
            });
            this.service = new application_service_1.ApplicationService(_serverSettings);
            this.search();
        }
    }
    exports.ApplicationViewModel = ApplicationViewModel;
});
