"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function check_keys(config) {
    var _a, _b;
    const map0 = (_a = config === null || config === void 0 ? void 0 : config.partialInput) !== null && _a !== void 0 ? _a : {};
    const cleaned = Object.assign({}, config);
    delete cleaned.partialInput;
    (_b = Object.entries(map0)) === null || _b === void 0 ? void 0 : _b.forEach(val => {
        var _a;
        (_a = Object.keys(val[1])) === null || _a === void 0 ? void 0 : _a.forEach(v => {
            if (Object.keys(cleaned).includes(v))
                map0[val[0]] = Object.assign(Object.assign({}, map0[val[0]]), { [v]: cleaned[v] });
        });
        cleaned.partialInput = map0;
    });
    return cleaned;
}
exports.default = check_keys;
//# sourceMappingURL=config.js.map