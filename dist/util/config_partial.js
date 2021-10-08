"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function configPartials(conf, cp) {
    let _copy = cp;
    conf.partials.forEach(p => {
        _copy = _copy.replace(`<!--@render-partial=${p.name}-->`, p.parsed);
    });
    return _copy;
}
exports.default = configPartials;
//# sourceMappingURL=config_partial.js.map