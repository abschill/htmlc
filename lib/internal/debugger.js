"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = exports.BG_COLOR_ESCAPES = exports.FG_COLOR_ESCAPES = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const _1 = require(".");
const { log, warn, error } = console;
exports.FG_COLOR_ESCAPES = {
    black: '\x1b[30m%s\x1b[0m',
    red: '\u001b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
    magenta: '\x1b[35m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    white: '\x1b[37m%s\x1b[0m'
};
exports.BG_COLOR_ESCAPES = {
    black: '\x1b[40m%s\x1b[0m',
    red: '\x1b[41m%s\x1b[0m',
    green: '\x1b[42m%s\x1b[0m',
    yellow: '\x1b[43m%s\x1b[0m',
    blue: '\x1b[44m%s\x1b[0m',
    magenta: '\x1b[45m%s\x1b[0m',
    cyan: '\x1b[46m%s\x1b[0m',
    white: '\x1b[47m%s\x1b[0m',
};
const HCL_EVENT_MAP = [
    {
        phase: 0,
        type: 0,
        signature: 'loader:init',
        fatal: false
    },
    {
        phase: 0,
        type: 0,
        signature: 'watch:init',
        fatal: false
    },
    {
        phase: -1,
        type: 1,
        signature: 'file:change',
        fatal: false
    },
    {
        phase: 1,
        type: 1,
        signature: 'partial:load',
        fatal: false
    },
    {
        phase: 1,
        type: 1,
        signature: 'template:load',
        fatal: false
    }
];
class Debugger {
    constructor(conf) {
        var _a, _b, _c;
        this.logMode = 'silent';
        this.logStrategy = 'none';
        this.runtimeOptions = conf;
        const { debug = _1.HCL_DEFAULTS.debug } = this.runtimeOptions;
        if (typeof (debug) === 'boolean') {
            if (debug === true) {
                this.logMode = 'verbose';
                this.logStrategy = 'stdout';
            }
        }
        else {
            this.logMode = (_a = debug === null || debug === void 0 ? void 0 : debug.logMode) !== null && _a !== void 0 ? _a : 'silent';
            this.logStrategy = (_b = debug === null || debug === void 0 ? void 0 : debug.logStrategy) !== null && _b !== void 0 ? _b : 'none';
            this.logFile = (_c = debug === null || debug === void 0 ? void 0 : debug.logFile) !== null && _c !== void 0 ? _c : 'hcl.log';
            this.silent = this.logMode === 'silent';
        }
        this.init();
    }
    get_logpath() {
        var _a;
        return (0, path_1.resolve)(process.cwd(), (_a = this.logFile) !== null && _a !== void 0 ? _a : 'hcl.log');
    }
    success(e) {
        var _a;
        switch (e.signature) {
            case 'loader:init':
                return this.std_init_success();
            default:
                return log('\x1b[42m%s\x1b[0m', 'hcl_debug:', (_a = e.event_data) !== null && _a !== void 0 ? _a : e.signature);
        }
    }
    std_init_success() {
        var _a, _b, _c;
        const path_root = (0, path_1.join)(process.cwd(), (_a = this.runtimeOptions.pathRoot) !== null && _a !== void 0 ? _a : _1.HCL_DEFAULTS.pathRoot);
        const t_root = (0, path_1.join)(path_root, (_b = this.runtimeOptions.templates) !== null && _b !== void 0 ? _b : _1.HCL_DEFAULTS.templates);
        const p_root = (0, path_1.join)(path_root, (_c = this.runtimeOptions.partials) !== null && _c !== void 0 ? _c : _1.HCL_DEFAULTS.partials);
        log(exports.FG_COLOR_ESCAPES.green, 'hcl_debug:pathRoot:', path_root);
        log(exports.FG_COLOR_ESCAPES.green, 'hcl_debug:templates:', t_root);
        log(exports.FG_COLOR_ESCAPES.green, 'hcl_debug:partials:', p_root);
        log(exports.FG_COLOR_ESCAPES.green, 'hcl_debug:event:', 'Loaded Config Successfully');
        log('\n');
    }
    std_load_template(event_data) {
        const { template_name, u_insert_map, c_insert_map } = event_data;
        log(exports.FG_COLOR_ESCAPES.blue, 'hcl_debug:template:load: ', template_name);
        if (!Object.is(u_insert_map, {}))
            log(exports.FG_COLOR_ESCAPES.blue, 'hcl:umap: ', u_insert_map);
        if (!Object.is(c_insert_map, {}))
            log(exports.FG_COLOR_ESCAPES.blue, 'hcl:cmap: ', c_insert_map);
        log('\n');
    }
    status(e, isEvent = typeof e != 'string') {
        if (!isEvent)
            return log(e);
        const { signature, event_data } = e;
        log('\x1b[44m%s\x1b[0m', 'hcl_debug:', signature);
        switch (signature) {
            case 'template:load':
                return this.std_load_template(event_data);
            default:
                return log(exports.FG_COLOR_ESCAPES.blue, 'hcl_debug:event:', event_data);
        }
    }
    append_line(__path, s) {
        (0, fs_1.appendFileSync)(__path, `${s !== null && s !== void 0 ? s : '~~~~~~~~~~~~~~~~~'}\n`);
    }
    event_to_file(e) {
        const logFilePath = (0, path_1.resolve)(process.cwd(), this.logFile);
        const { signature, event_data, phase, type } = e;
        const date = new Date();
        const timeStamp = date.toUTCString();
        if (!(0, fs_1.existsSync)(logFilePath))
            (0, fs_1.writeFileSync)(logFilePath, '');
        switch (signature) {
            default:
                this.append_line(logFilePath, `hcl_debug:event: ${signature}`);
                this.append_line(logFilePath, `hcl_debug:event_type: ${type}`);
                this.append_line(logFilePath, `hcl_debug:event_phase: ${phase}`);
                this.append_line(logFilePath, `${timeStamp}`);
                this.append_line(logFilePath);
                break;
        }
    }
    init() {
        if (this.silent)
            return;
        const ev = HCL_EVENT_MAP[0];
        if (this.logFile)
            this.event_to_file(ev);
        return this.success(ev);
    }
    handleEvent(sig, data) {
        const ev = HCL_EVENT_MAP.filter(ev => ev.signature === sig).pop();
        ev['event_data'] = data;
        return ev;
    }
    logEventNormal(e) {
        return this.status(e);
    }
    logEventFile(e) {
        return this.event_to_file(e);
    }
    event(name, data) {
        if (this.silent)
            return;
        return this.logFile ? this.logEventFile(this.handleEvent(name, data)) :
            this.logEventNormal(this.handleEvent(name, data));
    }
}
exports.Debugger = Debugger;
function createDebugger(options) {
    return new Debugger(options);
}
exports.default = createDebugger;
//# sourceMappingURL=debugger.js.map