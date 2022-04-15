"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABT_CLOSE_LOOP_SCOPE = exports.ABT_CLOSE_SCOPE = exports.ABT_OPEN_SCOPE = exports.ABT_LOOP_OPEN_REGGIE = exports.ABT_RENDER_REGGIE = exports.ABT_PARTIAL_REGGIE = exports.ABT_LOOP_SIGNATURE = exports.ABT_PARTIAL_SIGNATURE = exports.ABT_RENDER_SIGNATURE = exports.ABT_DT = void 0;
exports.ABT_DT = '@';
exports.ABT_RENDER_SIGNATURE = `${exports.ABT_DT}render`;
exports.ABT_PARTIAL_SIGNATURE = `${exports.ABT_DT}partial`;
exports.ABT_LOOP_SIGNATURE = `${exports.ABT_DT}loop`;
exports.ABT_PARTIAL_REGGIE = /<!--@partial=\w+[\w|\d|/\\]*-->/gi;
exports.ABT_RENDER_REGGIE = /<!--@render=\w+.?[\w|\d|.]+-->/gi;
exports.ABT_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
exports.ABT_OPEN_SCOPE = '<!--';
exports.ABT_CLOSE_SCOPE = '-->';
exports.ABT_CLOSE_LOOP_SCOPE = '}' + exports.ABT_CLOSE_SCOPE;
//# sourceMappingURL=constants.js.map