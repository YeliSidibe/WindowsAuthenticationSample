var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../viewmodels/find-application-modal"], function (require, exports, find_application_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindApplicationFilter {
        constructor(id, name, appService, permanentValue) {
            this.id = id;
            this.name = name;
            this.appService = appService;
            this.permanentValue = permanentValue;
            this.filterType = 'find-filter';
            this.modalId = 'find-application-modal';
            this.findButtonText = 'Select Application';
            this.value = ko.observable('');
            this.canEdit = true;
            this.selectedApplication = ko.observable();
            this.getApplication = (applicationId) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.appService.getApplication(applicationId);
                this.selectedApplication(response);
            });
            this.selectedAppNameComputed = () => {
                if (this.selectedApplication()) {
                    return this.selectedApplication().ApplicationName;
                }
                return '(no application selected)';
            };
            this.selectedApplicationComputed = (newApp) => {
                if (!newApp) {
                    return;
                }
                this.value(newApp.ApplicationId);
            };
            this.valueChanged = (newValue) => {
                if (!newValue) {
                    this.selectedApplication(null);
                }
            };
            if (permanentValue) {
                this.canEdit = false;
                this.value(permanentValue);
                this.getApplication(permanentValue);
            }
            this.findModal = new find_application_modal_1.FindApplicationModal(appService);
            this.displayText = ko.computed(this.selectedAppNameComputed, this);
            this.selectedApplication.subscribe(this.selectedApplicationComputed, this);
            this.value.subscribe(this.valueChanged);
        }
        find() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var application = yield this.findModal.open();
                    this.selectedApplication(application);
                }
                catch (_a) {
                    // they closed the modal w/out selecting anything.. so, nothing changed
                }
            });
        }
    }
    exports.FindApplicationFilter = FindApplicationFilter;
});
//# sourceMappingURL=find-application-filter.js.map