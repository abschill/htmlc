"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABT_PGROUP_REGGIE = exports.ABT_LOOP_OPEN_REGGIE = exports.ABT_RENDER_REGGIE = exports.ABT_PARTIAL_REGGIE = exports.ABT_PGROUP_SIGNATURE = exports.ABT_LOOP_SIGNATURE = exports.ABT_PARTIAL_SIGNATURE = exports.ABT_RENDER_SIGNATURE = void 0;
exports.ABT_RENDER_SIGNATURE = '@render';
exports.ABT_PARTIAL_SIGNATURE = '@partial';
exports.ABT_LOOP_SIGNATURE = '@loop';
exports.ABT_PGROUP_SIGNATURE = '@partials';
exports.ABT_PARTIAL_REGGIE = /<!--@partial=\w+[\w|\d|/\\]*-->/gi;
exports.ABT_RENDER_REGGIE = /<!--@render=\w+.?[\w|\d|.]+-->/gi;
exports.ABT_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
exports.ABT_PGROUP_REGGIE = /<!--@partials=\([\w+,]+\)/gi;
//# sourceMappingURL=constants.js.map