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
        (0, stamp_1.stampLog)(conf.config, 'fn::conf|compile.ts#L17');
        (0, stamp_1.stampLog)(data, 'fn::args|compile.ts#L18');
    }
    const globalInsertions = templateInput;
    if (Object.keys(data).length === 0) {
        if (Object.keys(templateInput).includes(template_name)) {
            const scopedInsertions = templateInput[template_name];
            const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput });
            if (conf.config.debug)
                (0, stamp_1.stampLog)(insertions, 'spread::args|compile.ts#L38', true);
            const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(conf.partials, rawFile, insertions, conf.config.debug);
            return out;
        }
        else {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            if (conf.config.debug)
                (0, stamp_1.stampLog)(insertions, 'insertion::args|compile.ts#L47', true);
            const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(conf.partials, rawFile, insertions, conf.config.debug);
            return out;
        }
    }
    else {
        const scopedInsertions = Object.assign(Object.assign({}, templateInput[template_name]), data);
        const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), data['partialInput']) });
        if (conf.config.debug)
            (0, stamp_1.stampLog)(insertions, 'insertion::args|compile.ts#L67', true);
        const fileMeta = conf.templates.filter(temp => temp.name === template_name)[0];
        const { rawFile } = fileMeta;
        const out = (0, _1.default)(conf.partials, rawFile, insertions, conf.config.debug);
        return out;
    }
}
exports.default = compileArgs;
//# sourceMappingURL=compile.js.map