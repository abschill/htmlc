"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIntlCode = void 0;
const htmlc_types_1 = require("htmlc-types");
const { warn } = console;
function checkIntlCode(u_config) {
    if (!u_config || !u_config.intlCode)
        return htmlc_types_1.Locale.en;
    if (u_config && u_config.errorSuppression) {
        try {
            return (0, htmlc_types_1.toLocale)(u_config.intlCode);
        }
        catch (e) {
            warn('Language Code Failed to Register, please ensure you enter a valid intl lang/country code');
            warn(e);
            return htmlc_types_1.Locale.en;
        }
    }
    else {
        return (0, htmlc_types_1.toLocale)(u_config.intlCode);
    }
}
exports.checkIntlCode = checkIntlCode;
//# sourceMappingURL=check-intl.js.map