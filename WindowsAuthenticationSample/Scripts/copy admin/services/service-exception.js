define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValidationMessage {
        constructor(code, description) {
            this.code = code;
            this.description = description;
        }
    }
    exports.ValidationMessage = ValidationMessage;
    class ServiceException {
        constructor(isBusinessException, validationMessages) {
            this.isBusinessException = isBusinessException;
            this.validationMessages = validationMessages;
        }
    }
    exports.ServiceException = ServiceException;
});
//# sourceMappingURL=service-exception.js.map