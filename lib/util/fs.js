"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTemplates = exports.usePartials = exports.mapPathList = exports.readValidFSTree = exports.createFileMap = exports.fileMap = exports.mapPath = exports.validFileList = exports.hasValidExtension = exports.ALLOWED_EXTENSIONS = exports.__BSD__ = exports.__WIN__ = void 0;
const _1 = require(".");
const _2 = require(".");
const fs_1 = require("fs");
const path_1 = require("path");
exports.__WIN__ = '\\';
exports.__BSD__ = '/';
exports.ALLOWED_EXTENSIONS = [
    '.html',
    '.htmlc',
    '.chtml',
    '.chunk'
];
const hasValidExtension = (filename, isExperimental) => {
    return isExperimental ? exports.ALLOWED_EXTENSIONS.filter(ext => filename.includes(ext)).length > 0 : filename.includes(exports.ALLOWED_EXTENSIONS[0]);
};
exports.hasValidExtension = hasValidExtension;
function validFileList(dir, isExp) {
    return (0, fs_1.readdirSync)(dir)
        .filter(x => (0, fs_1.statSync)((0, path_1.join)(dir, x)).isFile() && (0, exports.hasValidExtension)(x, isExp))
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
    return [name, splitter[0]];
}
exports.mapPath = mapPath;
function fileMap(path, splitter, basename, type) {
    const name = mapPath(splitter, basename, process.platform === 'win32' ? exports.__WIN__ : exports.__BSD__);
    const data = {
        type,
        path,
        rawFile: (0, fs_1.readFileSync)(path).toString('utf-8'),
        isCached: false,
        renderedChunk: null,
        hasChildNodes: false,
        needsRehydrate: false
    };
    if (splitter.length === 2) {
        return Object.assign(Object.assign({}, data), { name: name[0], extension: name[1] });
    }
    else {
        return Object.assign(Object.assign({}, data), { extension: name.pop(), name: name.join('') });
    }
}
exports.fileMap = fileMap;
function createFileMap(filepath, basepath, type) {
    return fileMap(filepath, filepath.split('.'), basepath, type);
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
function usePartials({ partials = _1.__DEFAULTS__.partials, pathRoot = _1.__DEFAULTS__.pathRoot, discoverPaths = _1.__DEFAULTS__.discoverPaths, experimentalExtensions = false }) {
    if (!(0, fs_1.existsSync)((0, path_1.join)(process.cwd(), pathRoot))) {
        console.error(_2.FG_COLOR_ESCAPES.red, 'path root doesnt exist: ', `${process.cwd()}/${pathRoot}`);
        process.exit(1);
    }
    const root = (0, path_1.join)(process.cwd(), pathRoot, partials);
    if (!(0, fs_1.existsSync)(root)) {
        console.error(_2.FG_COLOR_ESCAPES.red, 'path root doesnt exist: ', `${root}`);
        process.exit(1);
    }
    if (!discoverPaths)
        return validFileList(root, experimentalExtensions).map(file => createFileMap(file, partials, 'partial'));
    return (0, exports.mapPathList)(readValidFSTree(root), partials, 'partial');
}
exports.usePartials = usePartials;
function useTemplates({ templates = _1.__DEFAULTS__.templates, pathRoot = _1.__DEFAULTS__.pathRoot, discoverPaths = _1.__DEFAULTS__.discoverPaths, experimentalExtensions = false }) {
    if (!(0, fs_1.existsSync)((0, path_1.join)(process.cwd(), pathRoot))) {
        console.error(_2.FG_COLOR_ESCAPES.red, 'path root doesnt exist: ', `${process.cwd()}/${pathRoot}`);
        process.exit(1);
    }
    const root = (0, path_1.join)(process.cwd(), pathRoot, templates);
    if (!(0, fs_1.existsSync)(root)) {
        console.error(_2.FG_COLOR_ESCAPES.red, 'path root doesnt exist: ', `${root}`);
        process.exit(1);
    }
    if (!discoverPaths)
        return validFileList(root, experimentalExtensions).map((file) => createFileMap(file, templates, 'template'));
    return (0, exports.mapPathList)(readValidFSTree(root), templates, 'template');
}
exports.useTemplates = useTemplates;
//# sourceMappingURL=fs.js.map