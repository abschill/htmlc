"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLocale = exports.Locale = exports.DebugEventStatus = exports.DebugEventPhase = void 0;
var DebugEventPhase;
(function (DebugEventPhase) {
    DebugEventPhase[DebugEventPhase["UNSPECIFIED"] = -1] = "UNSPECIFIED";
    DebugEventPhase[DebugEventPhase["RUNTIME_INIT"] = 0] = "RUNTIME_INIT";
    DebugEventPhase[DebugEventPhase["CHUNK_RESOLVE"] = 1] = "CHUNK_RESOLVE";
    DebugEventPhase[DebugEventPhase["CHUNK_TOKENIZE"] = 2] = "CHUNK_TOKENIZE";
    DebugEventPhase[DebugEventPhase["CHUNK_RENDER"] = 3] = "CHUNK_RENDER";
})(DebugEventPhase = exports.DebugEventPhase || (exports.DebugEventPhase = {}));
var DebugEventStatus;
(function (DebugEventStatus) {
    DebugEventStatus[DebugEventStatus["VERBOSE"] = 0] = "VERBOSE";
    DebugEventStatus[DebugEventStatus["DEFAULT"] = 1] = "DEFAULT";
    DebugEventStatus[DebugEventStatus["CRITICAL"] = 2] = "CRITICAL";
})(DebugEventStatus = exports.DebugEventStatus || (exports.DebugEventStatus = {}));
var locale_1 = require("./locale");
Object.defineProperty(exports, "Locale", { enumerable: true, get: function () { return locale_1.Locale; } });
Object.defineProperty(exports, "toLocale", { enumerable: true, get: function () { return locale_1.toLocale; } });
//# sourceMappingURL=index.js.map