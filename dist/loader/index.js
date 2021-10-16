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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const partial_1 = __importDefault(require("../partial"));
const template_1 = __importDefault(require("../template"));
const default_1 = __importDefault(require("../default"));
class Loader {
    constructor(_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var opts = __rest(_a, []);
        this._config = {
            pathRoot: (_b = opts === null || opts === void 0 ? void 0 : opts.pathRoot) !== null && _b !== void 0 ? _b : default_1.default.rootDefault,
            templates: (_c = opts === null || opts === void 0 ? void 0 : opts.templates) !== null && _c !== void 0 ? _c : default_1.default.templateDefault,
            partials: (_d = opts === null || opts === void 0 ? void 0 : opts.partials) !== null && _d !== void 0 ? _d : default_1.default.partialDefault
        };
        this._partialInput = (_g = (_e = opts === null || opts === void 0 ? void 0 : opts._partialInput) !== null && _e !== void 0 ? _e : (_f = require(path_1.default.join(process.cwd(), 'package.json'))) === null || _f === void 0 ? void 0 : _f._partial_data) !== null && _g !== void 0 ? _g : {};
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this.verbose = (_h = opts === null || opts === void 0 ? void 0 : opts.debug) !== null && _h !== void 0 ? _h : false;
        this._configure();
    }
    _configure() {
        const root_dir = path_1.default.join(process.cwd(), this._config.pathRoot);
        if (fs_1.default.existsSync(root_dir)) {
            if (this.verbose) {
                console.log(`Root Directory found at ${root_dir}`);
            }
            const tde = fs_1.default.existsSync(path_1.default.join(root_dir, this._config.templates));
            if (this.verbose && tde) {
                console.log(`Template Directory found`);
            }
            if (tde && fs_1.default.existsSync(path_1.default.join(root_dir, this._config.partials))) {
                const templates_ = path_1.default.join(root_dir, this._config.templates);
                const partials_ = path_1.default.join(root_dir, this._config.partials);
                fs_1.default.readdirSync(templates_).forEach(_template => {
                    return this.templates.push(new template_1.default(this, _template.split('.html')[0], path_1.default.join(templates_, _template)));
                });
                fs_1.default.readdirSync(partials_).forEach(_partial => {
                    var _a, _b, _c;
                    const name = _partial.split('.html')[0];
                    return this.partials.push(new partial_1.default(name, path_1.default.join(partials_, _partial), (_c = (_b = (_a = Object.entries(this === null || this === void 0 ? void 0 : this._partialInput)) === null || _a === void 0 ? void 0 : _a.filter(_ => _[0] === name)) === null || _b === void 0 ? void 0 : _b['0']) === null || _c === void 0 ? void 0 : _c['1']));
                });
            }
            else {
                if (tde) {
                    throw new Error(`Partial directory "${this._config.partials}" not found in ${process.cwd()}`);
                }
                else {
                    throw new Error(`Template directory "${this._config.templates}" not found in ${process.cwd()}`);
                }
            }
            if (this.verbose) {
                console.log('Partials: \n');
                console.log(this.partials);
                console.log('Templates: \n');
                console.log(this.templates);
            }
        }
        else {
            throw new Error(`Directory "${this._config.pathRoot}" not found in ${process.cwd()}`);
        }
    }
    getTemplate(name, _a) {
        var content = __rest(_a, []);
        const target = this.templates.filter(_ => _.name === name)[0];
        if (this.verbose) {
            console.log('To Load: \n');
            console.log(content);
            console.log('Into Template: \n');
            console.log(target);
        }
        if (Object.keys(content).length > 0) {
            const rendered = target.render(content);
            if (this.verbose) {
                console.log('Rendered: \n');
                console.log(rendered);
            }
            return rendered;
        }
        else {
            return target.render({});
        }
    }
}
exports.default = Loader;
//# sourceMappingURL=index.js.map