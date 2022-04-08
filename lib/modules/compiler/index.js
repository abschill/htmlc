"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./parser"));
const html_1 = require("../../internal/util/html");
class Compiler {
    static scanTemplateV1(args) {
        try {
            const fileData = args.caller_ctx.chunks.filter(chunk => chunk.type === 'template' && chunk.name === args.template_name)[0];
            return fileData.rawFile;
        }
        catch (e) {
            console.warn('todo: handle scan template error - raw error: \n');
            console.error(e);
        }
    }
    static compileTemplateV1(args) {
        const { templateInput = {}, partialInput = {} } = args.caller_ctx.config;
        if (!args.caller_data)
            args.caller_data = {};
        const globalInsertions = templateInput;
        if (Object.keys(args.caller_data).length === 0) {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            args.debug.event('template:load', {
                template_name: args.template_name,
                u_insert_map: args.caller_data,
                c_insert_map: insertions
            });
            return Compiler.renderV1(args.caller_ctx.chunks.filter(chunk => chunk.type === 'partial'), Compiler.scanTemplateV1(args), insertions);
        }
        else {
            const scopedInsertions = Object.assign(Object.assign({}, templateInput), args.caller_data);
            const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), args.caller_data['partialInput']) });
            args.debug.event('template:load', {
                template_name: args.template_name,
                u_insert_map: args.caller_data,
                c_insert_map: insertions
            });
            return Compiler.renderV1(args.caller_ctx.chunks.filter(chunk => chunk.type === 'partial'), Compiler.scanTemplateV1(args), insertions, args.caller_ctx.config.intlCode);
        }
    }
    static renderV1(declaredPartials, rawFile, insertMap, lang) {
        const renMap = parser_1.default.renderMap(rawFile);
        try {
            if (renMap.todo_partials && renMap.todo_partials.length > 0)
                rawFile = Compiler.shimPartialsV1(rawFile, declaredPartials, insertMap);
            if (renMap.todo_keys && renMap.todo_keys.length > 0)
                rawFile = Compiler.shimKeysV1(rawFile, insertMap);
            if (renMap.todo_loops && renMap.todo_loops.length > 0)
                rawFile = Compiler.shimLoopsV1(rawFile, insertMap);
            return (0, html_1.cleanHTML)(rawFile, lang);
        }
        catch (e) {
            return rawFile;
        }
    }
    static resolveV1(file, renderMap, insertionMap) {
        let render = file;
        const outVal = [];
        const outObj = [];
        for (const [key, value] of Object.entries(renderMap)) {
            const itemlist = [key, value];
            itemlist[1].forEach((r) => {
                var _a;
                switch (itemlist[0]) {
                    case 'todo_keys':
                        r = r;
                        const name = r.split(`${parser_1.default.__renderKey__}=`)[1].split(parser_1.default.__CLOSE__)[0];
                        const globals = insertionMap;
                        let replaceVal = insertionMap[name];
                        if (!replaceVal) {
                            try {
                                replaceVal = globals[name];
                            }
                            catch (e) {
                                replaceVal = '';
                            }
                        }
                        render = render.replace(r, replaceVal);
                        break;
                    case 'todo_loops':
                        r = r;
                        const loopName = (_a = r.split('(')[1]) === null || _a === void 0 ? void 0 : _a.split(')')[0];
                        const toInsert = insertionMap[loopName];
                        const elChild = r.replace(parser_1.default.LOOP_OPEN(loopName), '').replace(parser_1.default.LOOP_CLOSE, '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            r = r;
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
                        });
                        break;
                    case 'todo_partials':
                        break;
                    default:
                        break;
                }
            });
        }
        const valStr = outVal.map((val) => val.insertion).join('');
        const objStr = outObj.map((obj) => obj.insertion).join('');
        outVal.forEach((_out) => render = render.replace(_out.replacer, valStr));
        outObj.forEach((_out) => render = render.replace(_out.replacer, objStr));
        parser_1.default.checkDeprecation(render);
        return {
            raw: file,
            render
        };
    }
    static renderPartialV5(chunkData, insertMap) {
        var _a;
        let renderedChunk = chunkData.rawFile;
        const scoped_insertion = (_a = insertMap['partialInput']) !== null && _a !== void 0 ? _a : {};
        const insertion = Object.assign(Object.assign({}, insertMap), scoped_insertion);
        const toReplaceChunks = parser_1.default.ABT.map(word => {
            const buffer = word.array(chunkData.rawFile);
            if (!buffer || buffer.length === 0)
                return null;
            return { buffer, keyname: word.key };
        }).filter(e => e).flat();
        if (!toReplaceChunks || toReplaceChunks.length === 0)
            return;
        toReplaceChunks.map(chunk => {
            chunk.buffer.forEach(buf => {
                const keyname = buf.replace(`<!--${chunk.keyname}=`, '').replace('-->', '');
                renderedChunk = renderedChunk.replace(buf, insertion[keyname]);
            });
        });
        return renderedChunk;
    }
    static preloadChunksV5(ctx) {
        return ctx.chunks.map((fd) => {
            if (!parser_1.default.hasSymbols(fd.rawFile)) {
                fd.renderedChunk = fd.rawFile;
                return fd;
            }
            return fd;
        });
    }
    static resolvePartialsV1(renMap, declaredPartials, insertMap, rootCopy) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split(`${parser_1.default.__partialKey__}=`)[1].split(parser_1.default.__CLOSE__)[0];
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a;
                    if (partial.renderedChunk && !partial.needsRehydrate) {
                        rootCopy = rootCopy.replace(partialSeg, partial.renderedChunk);
                    }
                    else {
                        const scoped_insertion = (_a = insertMap['partialInput']) !== null && _a !== void 0 ? _a : {};
                        const insertion = Object.assign(Object.assign({}, insertMap), scoped_insertion);
                        rootCopy = rootCopy.replace(partialSeg, Compiler.resolveV1(partial.rawFile, parser_1.default.renderMap(partial.rawFile), insertion).render);
                    }
                });
            }
        });
        return rootCopy;
    }
    static resolveKeysV1(renMap, insertMap, rootCopy) {
        renMap.todo_keys.forEach(_ => rootCopy = Compiler.resolveV1(rootCopy, parser_1.default.renderMap(rootCopy), insertMap).render);
        return rootCopy;
    }
    static resolveLoopsV1(renMap, insertMap, rootCopy) {
        renMap.todo_loops.forEach(_ => rootCopy = Compiler.resolveV1(rootCopy, parser_1.default.renderMap(rootCopy), insertMap).render);
        return rootCopy;
    }
}
exports.default = Compiler;
Compiler.shimKeysV1 = (copy, insertMap) => Compiler.resolveKeysV1(parser_1.default.renderMap(copy), insertMap, copy);
Compiler.shimPartialsV1 = (copy, declaredPartials, insertMap) => Compiler.resolvePartialsV1(parser_1.default.renderMap(copy), declaredPartials, insertMap, copy);
Compiler.shimLoopsV1 = (copy, insertMap) => Compiler.resolveLoopsV1(parser_1.default.renderMap(copy), insertMap, copy);
//# sourceMappingURL=index.js.map