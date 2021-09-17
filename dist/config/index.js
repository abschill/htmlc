"use strict";
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
    constructor() {
        this._config = {
            "rootDir": "views",
            "templateDir": "pages",
            "partialDir": "partials",
            "staticGeneration": false,
        };
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this._configure();
    }
    _configure() {
        const config_path = path_1.default.join(process.cwd(), `render.config.js`);
        const root_dir = path_1.default.join(process.cwd(), this._config.rootDir);
        if (fs_extra_1.default.existsSync(config_path)) {
            this._config = require(config_path);
        }
        if (fs_extra_1.default.pathExistsSync(root_dir)) {
            if (fs_extra_1.default.pathExistsSync(path_1.default.join(root_dir, this._config.templateDir))
                && fs_extra_1.default.pathExistsSync(path_1.default.join(root_dir, this._config.partialDir))) {
                const templates_ = path_1.default.join(root_dir, this._config.templateDir);
                const partials_ = path_1.default.join(root_dir, this._config.partialDir);
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
    }
    getTemplates() {
        return this.templates;
    }
    getPartials() {
        return this.partials;
    }
    toObject() {
        return {
            config: this._config,
            templates: this.templates,
            partials: this.partials
        };
    }
    getTemplate(name, ...content) {
        const target = this.templates.filter(_ => _.name === name)[0];
        if (!target.parsed) {
            target.parse(content);
            return target.parsed;
        }
        else {
            throw new Error('Template Failed to Parse');
        }
    }
}
exports.default = Loader;
//# sourceMappingURL=index.js.map