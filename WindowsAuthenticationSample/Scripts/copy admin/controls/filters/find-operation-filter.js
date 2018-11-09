var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../viewmodels/find-operation-modal"], function (require, exports, find_operation_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindOperationFilter {
        constructor(id, name, operationService, permanentValue) {
            this.id = id;
            this.name = name;
            this.operationService = operationService;
            this.permanentValue = permanentValue;
            this.filterType = 'find-filter';
            this.modalId = 'find-operation-modal';
            this.findButtonText = 'Select Operation';
            this.value = ko.observable('');
            this.canEdit = true;
            this.selectedOperation = ko.observable();
            this.getOperation = (operationId) => __awaiter(this, void 0, void 0, function* () {
                const operation = yield this.operationService.getOperation(operationId);
                this.selectedOperation(operation);
            });
            this.selectedOperationNameComputed = () => {
                if (this.selectedOperation()) {
                    return this.selectedOperation().OperationName;
                }
                return '(no operation selected)';
            };
            this.selectedOperationComputed = (newApp) => {
                if (!newApp) {
                    return;
                }
                this.value(newApp.OperationId);
            };
            this.valueChanged = (newValue) => {
                if (!newValue) {
                    this.selectedOperation(null);
                }
            };
            if (permanentValue) {
                this.canEdit = false;
                this.value(permanentValue);
                this.getOperation(permanentValue);
            }
            this.findModal = new find_operation_modal_1.FindOperationModal(operationService);
            this.displayText = ko.computed(this.selectedOperationNameComputed, this);
            this.selectedOperation.subscribe(this.selectedOperationComputed, this);
            this.value.subscribe(this.valueChanged);
        }
        find() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var operation = yield this.findModal.open();
                    this.selectedOperation(operation);
                }
                catch (_a) {
                    // they closed the modal w/out selecting anything.. so, nothing changed
                }
            });
        }
    }
    exports.FindOperationFilter = FindOperationFilter;
});
//# sourceMappingURL=find-operation-filter.js.map