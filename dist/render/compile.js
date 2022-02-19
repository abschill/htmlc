"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stamp_1 = require("../util/stamp");
const _1 = __importDefault(require("."));
function compileArgs(template_name, conf, data) {
    const { templateInput = {}, partialInput = {} } = conf.config;
    if (!data)
        data = {};
    if (conf.config.debug) {
        (0, stamp_1.stampLog)(conf.config, 'fn::conf');
        (0, stamp_1.stampLog)(data, 'fn::args');
    }
    if (Object.keys(data).length === 0) {
        const globalInsertions = Object.keys(templateInput).includes('*') ? templateInput['*'] : {};
        if (Object.keys(templateInput).includes(template_name)) {
            const namedInsertions = templateInput[template_name];
            const spreadInsertions = Object.assign(Object.assign(Object.assign({}, namedInsertions), globalInsertions), { partialInput });
            if (conf.config.debug)
                (0, stamp_1.stampLog)(spreadInsertions, 'spread::args', true);
            const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(conf.partials, rawFile, spreadInsertions, conf.config.debug);
            return out;
        }
        else {
            const spreadInsertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            if (conf.config.debug)
                (0, stamp_1.stampLog)(spreadInsertions, 'spread::args', true);
            const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(conf.partials, rawFile, spreadInsertions, conf.config.debug);
            return out;
        }
    }
    else {
        const namedInsertions = Object.assign(Object.assign({}, templateInput[template_name]), data);
        const globalInsertions = Object.keys(templateInput).includes('*') ? templateInput['*'] : {};
        const spreadInsertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), namedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), { "*": Object.assign(Object.assign({}, partialInput['*']), data['partialInput']) }) });
        if (conf.config.debug)
            (0, stamp_1.stampLog)(spreadInsertions, 'spread::args', true);
        const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
        const { rawFile } = fileMeta;
        const out = (0, _1.default)(conf.partials, rawFile, spreadInsertions, conf.config.debug);
        return out;
    }
}
exports.default = compileArgs;
//# sourceMappingURL=compile.js.map