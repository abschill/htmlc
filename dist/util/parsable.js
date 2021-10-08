"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parsable(_varList, _dom) {
    return Object.keys(_varList).map(x => {
        const render_val = `<!--@render=${x}-->`;
        const loop_val = `<!--@for(${x}){`;
        if (_dom.includes(render_val)) {
            return render_val;
        }
        if (_dom.includes(loop_val)) {
            return loop_val;
        }
        return false;
    });
}
exports.default = parsable;
//# sourceMappingURL=parsable.js.map