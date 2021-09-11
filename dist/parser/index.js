"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class Parser {
    constructor(segment) {
        this.segment = segment;
        this.type = (0, util_1.getType)(this.segment);
        this._parsedSegment = null;
    }
    run() {
        if (this.type === 'template') {
            //@ts-ignore
            this.segment.partials.forEach(part => {
                if (part.varList) {
                    const final = (0, util_1.renderVars)(part.content, part.varList);
                    part.content = final;
                }
            });
        }
        else {
            console.log(this.type);
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=index.js.map