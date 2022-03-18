"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const debugger_1 = __importDefault(require("./internals/debugger"));
const abt_1 = __importDefault(require("./abt"));
const parser_1 = __importDefault(require("./parser"));
class Compiler {
    static scanTemplate(args) {
        try {
            const fileData = args.ctx.templates.filter((temp) => temp.name === args.template_name)[0];
            return fileData.rawFile;
        }
        catch (e) {
            debugger_1.default.raise(`Template '${args.template_name} not found'`);
        }
    }
    static __renderMap(content) {
        const __map__ = {
            todo_keys: [],
            todo_loops: [],
            todo_partials: []
        };
        abt_1.default.forEach(token => {
            const keymap = token.array(content);
            switch (token.key) {
                case parser_1.default.__renderKey__:
                    keymap ? __map__.todo_keys = keymap : __map__.todo_keys = [];
                    break;
                case parser_1.default.__loopKey__:
                    keymap ? __map__.todo_loops = keymap : __map__.todo_loops = [];
                    break;
                case parser_1.default.__partialKey__:
                    keymap ? __map__.todo_partials = keymap : __map__.todo_partials = [];
                    break;
                default:
                    break;
            }
        });
        return __map__;
    }
    static compile(args) {
        const { templateInput = {}, partialInput = {} } = args.ctx.config;
        if (!args.data)
            args.data = {};
        debugger_1.default._registerEvent('init', args.ctx, arguments);
        const globalInsertions = templateInput;
        if (Object.keys(args.data).length === 0) {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            debugger_1.default._registerEvent('template::insert:args', args.ctx, arguments);
            return _1.default(args.ctx.partials, Compiler.scanTemplate(args), insertions, args.ctx.config.debug !== null);
        }
        else {
            const scopedInsertions = Object.assign(Object.assign({}, templateInput), args.data);
            const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), args.data['partialInput']) });
            debugger_1.default._registerEvent('insert', args.ctx, arguments);
            return _1.default(args.ctx.partials, Compiler.scanTemplate(args), insertions, args.ctx.config.debug !== null);
        }
    }
    static resolve(file, renderMap, insertionMap, debug) {
        let copy = file;
        const outVal = [];
        const outObj = [];
        if (debug)
            debugger_1.default._registerMap(renderMap, insertionMap);
        Object.entries(renderMap).forEach((itemlist) => {
            if (!itemlist[1]) {
                if (debug)
                    debugger_1.default.raise(`Passing ${itemlist[0]}`);
            }
            else {
                itemlist[1].forEach(r => {
                    var _a;
                    switch (itemlist[0]) {
                        case 'todo_keys':
                            const name = r.split(`${parser_1.default.__renderKey__}=`)[1].split(parser_1.default.__CLOSE__)[0];
                            const globals = insertionMap;
                            let replaceVal = insertionMap[name];
                            if (!replaceVal) {
                                try {
                                    replaceVal = globals[name];
                                }
                                catch (e) {
                                    debugger_1.default.raise(`Failed to find ${name} to insert into ${file}`);
                                    replaceVal = '';
                                }
                            }
                            copy = copy.replace(r, replaceVal);
                            break;
                        case 'todo_loops':
                            const loopName = (_a = r.split('(')[1]) === null || _a === void 0 ? void 0 : _a.split(')')[0];
                            const toInsert = insertionMap[loopName];
                            const elChild = r.replace(parser_1.default.LOOP_OPEN(loopName), '').replace(parser_1.default.LOOP_CLOSE, '')
                                .trimStart().replace(/\s\s+/gi, '');
                            toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                                if (typeof (insertion) === 'string') {
                                    outVal.push({
                                        replacer: r,
                                        insertion: parser_1.default.replaceAnonLoopBuf({ target: elChild, key: insertion })
                                    });
                                }
                                else if (typeof (insertion) === 'object') {
                                    const entries = Object.entries(insertion);
                                    if (entries.length > 0)
                                        outObj.push({
                                            replacer: r,
                                            insertion: parser_1.default.replacedNamedLoopBuf(elChild, entries)
                                        });
                                }
                                else {
                                    debugger_1.default.raise(`warning: insertion ${loopName} has an unrecognized value of:\n`);
                                    debugger_1.default.raise(insertion);
                                }
                            });
                            break;
                        case 'todo_partials':
                            break;
                        default:
                            break;
                    }
                });
            }
        });
        const valStr = outVal.map((val) => val.insertion).join('');
        const objStr = outObj.map((obj) => obj.insertion).join('');
        outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
        outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
        return {
            raw: file,
            renderMap,
            insertionMap,
            render: copy
        };
    }
}
exports.default = Compiler;
//# sourceMappingURL=compile.js.map