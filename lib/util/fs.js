"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTemplates = exports.findPartials = exports.mapPathList = exports.readValidFSTree = exports.createFileMap = exports.fileMap = exports.mapPath = exports.validFileList = exports.__BSD__ = exports.__WIN__ = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const _1 = require(".");
exports.__WIN__ = '\\';
exports.__BSD__ = '/';
function validFileList(dir) {
    return (0, fs_1.readdirSync)(dir)
        .filter(x => (0, fs_1.statSync)((0, path_1.join)(dir, x)).isFile() && x.includes('.html'))
        .map(x => (0, path_1.resolve)(dir, x));
}
exports.validFileList = validFileList;
function mapPath(splitter, basename, sysSplit) {
    let name = splitter[0];
    const na = name.split(sysSplit);
    name = na[na.length - 1];
    const base = na.indexOf(basename);
    const offset = na.indexOf(name) - base;
    if (offset > 1) {
        const prefixArr = [];
        for (let i = base + 1; i < base + offset + 1; i++) {
            prefixArr.push(na[i]);
        }
        name = prefixArr.join('/');
    }
    return name;
}
exports.mapPath = mapPath;
function fileMap(path, splitter, basename, type) {
    const name = mapPath(splitter, basename, process.platform === 'win32' ? exports.__WIN__ : exports.__BSD__);
    return {
        type,
        path,
        rawFile: (0, fs_1.readFileSync)(path).toString('utf-8'),
        name,
        isCached: false,
        renderedChunk: null,
        needsRehydrate: false
    };
}
exports.fileMap = fileMap;
function createFileMap(filepath, basepath, type) {
    return fileMap(filepath, filepath.split('.html'), basepath, type);
}
exports.createFileMap = createFileMap;
function readValidFSTree(dir) {
    return (0, fs_1.readdirSync)(dir).map(file => {
        const filepath = (0, path_1.join)(dir, file);
        return (0, fs_1.statSync)(filepath).isDirectory() ? readValidFSTree(filepath) : filepath;
    }).flat();
}
exports.readValidFSTree = readValidFSTree;
const mapPathList = (paths, base, type) => paths.map((file) => createFileMap(file, base, type));
exports.mapPathList = mapPathList;
function findPartials({ partials = _1.__DEFAULTS__.partials, pathRoot = _1.__DEFAULTS__.pathRoot, discoverPaths = _1.__DEFAULTS__.discoverPaths }) {
    const root = (0, path_1.join)(process.cwd(), pathRoot, partials);
    if (!discoverPaths)
        return validFileList(root).map(file => createFileMap(file, partials, 'partial'));
    return (0, exports.mapPathList)(readValidFSTree(root), partials, 'partial');
}
exports.findPartials = findPartials;
function findTemplates({ templates = _1.__DEFAULTS__.templates, pathRoot = _1.__DEFAULTS__.pathRoot, discoverPaths = _1.__DEFAULTS__.discoverPaths }) {
    const root = (0, path_1.join)(process.cwd(), pathRoot, templates);
    if (!discoverPaths)
        return validFileList(root).map((file) => createFileMap(file, templates, 'template'));
    return (0, exports.mapPathList)(readValidFSTree(root), templates, 'template');
}
exports.findTemplates = findTemplates;
//# sourceMappingURL=fs.js.map