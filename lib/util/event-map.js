"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HCL_EVENT_MAP = void 0;
exports.HCL_EVENT_MAP = [
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
//# sourceMappingURL=event-map.js.map