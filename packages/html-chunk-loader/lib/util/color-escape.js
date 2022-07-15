"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BG_COLOR_ESCAPES = exports.FG_COLOR_ESCAPES = void 0;
exports.FG_COLOR_ESCAPES = {
    black: '\x1b[30m%s\x1b[0m',
    red: '\u001b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
    magenta: '\x1b[35m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    white: '\x1b[37m%s\x1b[0m'
};
exports.BG_COLOR_ESCAPES = {
    black: '\x1b[40m%s\x1b[0m',
    red: '\x1b[41m%s\x1b[0m',
    green: '\x1b[42m%s\x1b[0m',
    yellow: '\x1b[43m%s\x1b[0m',
    blue: '\x1b[44m%s\x1b[0m',
    magenta: '\x1b[45m%s\x1b[0m',
    cyan: '\x1b[46m%s\x1b[0m',
    white: '\x1b[47m%s\x1b[0m',
};
//# sourceMappingURL=color-escape.js.map