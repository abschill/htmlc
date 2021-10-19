"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = __importDefault(require("./util/engine"));
const logger_1 = require("./util/logger");
const render_1 = __importDefault(require("./util/internal/ast/render"));
const loader = (_a) => {
    var config = __rest(_a, []);
    if (config.debug) {
        (0, logger_1.statusObj)('Initial Args: ', config);
    }
    const conf = (0, engine_1.default)(config);
    if (config.debug) {
        (0, logger_1.statusObj)('Config:', conf);
    }
    function loadTemplate(name, _a) {
        var data = __rest(_a, []);
        const namedInsertions = config.templateInput[name];
        const { partialInput } = config;
        const globalInsertions = config.templateInput['*'];
        const spreadInsertions = Object.assign(Object.assign(Object.assign(Object.assign({}, namedInsertions), globalInsertions), data), { partialInput });
        console.log(spreadInsertions);
        const fileMeta = conf.ctx.templates.filter(temp => temp.name === name)[0];
        const { rawFile } = fileMeta;
        const out = (0, render_1.default)(conf.ctx.partials, rawFile, spreadInsertions);
        return out;
    }
    return {
        loadTemplate
    };
};
exports.default = loader;
//# sourceMappingURL=loader.js.map