"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iterateObj(segment, entries) {
    let shallow = segment;
    Object.entries(entries).map(ent => {
        shallow = shallow.replace(`{${ent[0]}}`, ent[1]);
    });
    return shallow;
}
exports.default = iterateObj;
//# sourceMappingURL=iterate_object.js.map