"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HCL_EVENT_MAP = void 0;
exports.HCL_EVENT_MAP = [
    {
        phase: 0,
        signature: 'loader:init',
        fatal: true
    },
    {
        phase: 0,
        signature: 'watch:init',
        fatal: false
    },
    {
        phase: -1,
        signature: 'file:change',
        fatal: false
    },
    {
        phase: 1,
        signature: 'parser:tokenize',
        fatal: true
    },
    {
        phase: 2,
        signature: 'partial:load',
        fatal: false
    },
    {
        phase: 3,
        signature: 'template:load',
        fatal: true
    },
    {
        phase: 2,
        signature: 'compiler:resolutions',
        fatal: true
    }
];
//# sourceMappingURL=event-map.js.map