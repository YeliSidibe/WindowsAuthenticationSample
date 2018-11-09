define(["require", "exports"], function (require, exports) {
    "use strict";
    class ValidationMessages {
        constructor(code, description) {
            this.code = code;
            this.description = description;
        }
    }
    exports.ValidationMessages = ValidationMessages;
    class ServiceException {
        constructor(isBusinessException, validationMessages) {
            this.isBusinessException = isBusinessException;
            this.validationMessages = validationMessages;
        }
    }
    exports.ServiceException = ServiceException;
});
