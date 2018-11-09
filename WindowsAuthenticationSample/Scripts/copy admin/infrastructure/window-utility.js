define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WindowUtil {
        static getQueryStringParameter(name) {
            let urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }
    }
    exports.default = WindowUtil;
});
//# sourceMappingURL=window-utility.js.map