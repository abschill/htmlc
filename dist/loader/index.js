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
//overwrite with stml.config.js
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const partial_1 = __importDefault(require("../partial"));
const template_1 = __importDefault(require("../template"));
class Loader {
    constructor(_a) {
        var opts = __rest(_a, []);
        this._config = {
            pathRoot: opts.pathRoot || 'views',
            templates: opts.templates || 'pages',
            partials: opts.partials || 'partials',
            static: opts.static || false
        };
        this._partialInput = opts._partialInput;
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this._configure();
    }
    _configure() {
        const config_path = path_1.default.join(process.cwd(), `render.config.js`);
        const root_dir = path_1.default.join(process.cwd(), this._config.pathRoot);
        if (fs_extra_1.default.existsSync(config_path)) {
            this._config = require(config_path);
        }
        if (fs_extra_1.default.pathExistsSync(root_dir)) {
            if (fs_extra_1.default.pathExistsSync(path_1.default.join(root_dir, this._config.templates))
                && fs_extra_1.default.pathExistsSync(path_1.default.join(root_dir, this._config.partials))) {
                const templates_ = path_1.default.join(root_dir, this._config.templates);
                const partials_ = path_1.default.join(root_dir, this._config.partials);
                fs_extra_1.default.readdirSync(templates_).forEach(_template => {
                    return this.templates.push(new template_1.default(this, _template.split('.html')[0], path_1.default.join(templates_, _template)));
                });
                fs_extra_1.default.readdirSync(partials_).forEach(_partial => {
                    return this.partials.push(new partial_1.default(this, _partial.split('.html')[0], path_1.default.join(partials_, _partial)));
                });
            }
            else {
                throw new Error('Directory not configured');
            }
        }
        this._partials_process();
    }
    _partials_process() {
        if (this._partialInput) {
            //@ts-ignore
            this.partials = this.getPartials().map(_ => _.parse(this._partialInput));
        }
    }
    getTemplates(mode) {
        switch (mode) {
            case 'preload':
                //@ts-ignore
                const _ = this.templates.map(_ => _._preload());
                return _;
            default:
                return this.templates;
        }
    }
    getPartials() {
        return this.partials;
    }
    _asObject() {
        return {
            config: this._config,
            templates: this.templates,
            partials: this.partials
        };
    }
    getTemplate(name, _a) {
        var content = __rest(_a, []);
        const target = this.templates.filter(_ => _.name === name)[0];
        if (Object.keys(content).length > 0) {
            return target.render([content]);
        }
        else {
            return target.render([]);
        }
    }
}
exports.default = Loader;
//# sourceMappingURL=index.js.map