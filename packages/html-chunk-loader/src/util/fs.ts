/**
 * @module fs internal file handling
 */
import { __DEFAULTS__ } from 'htmlc-config';
import { color } from 'terminal-color';
import {
	ChunkableSplitData,
	HTMLChunk,
	HTMLChunkType,
	SSROptions,
} from 'htmlc-types';
import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

export const __WIN__ = '\\';
export const __BSD__ = '/';

// this is for the upcoming extension intellisense, as well as general shifting towards a standalone compiler outside of nodejs - interop thru the gyp
// todo: make a config setting to allow user to declare the filetype as a constant so that they can reduce iterations at runtime
export const ALLOWED_EXTENSIONS = ['.html', '.htmlc', '.chtml', '.chunk'];

export const hasValidExtension = (
	filename: string,
	isExperimental: boolean
) => {
	return isExperimental
		? ALLOWED_EXTENSIONS.filter((ext) => filename.includes(ext)).length > 0
		: filename.includes(ALLOWED_EXTENSIONS[0]);
};

export function validFileList(dir: string, isExp: boolean): string[] {
	return readdirSync(dir)
		.filter(
			(x) =>
				statSync(join(dir, x)).isFile() && hasValidExtension(x, isExp)
		)
		.map((x) => resolve(dir, x));
}

export function mapPath(
	splitter: string[],
	basename: string,
	sysSplit: string
): ChunkableSplitData {
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

export function fileMap(
	path: string,
	splitter: string[],
	basename: string,
	type: HTMLChunkType
): HTMLChunk {
	const name = mapPath(
		splitter,
		basename,
		process.platform === 'win32' ? __WIN__ : __BSD__
	);
	const data = {
		type,
		path,
		rawFile: readFileSync(path).toString('utf-8'),
		isCached: false,
		renderedChunk: null,
		hasChildNodes: false,
		needsRehydrate: false,
	};
	if (splitter.length === 2) {
		return {
			...data,
			name: name[0],
			extension: name[1],
		};
	} else {
		return {
			...data,
			extension: name.pop(),
			name: name.join(''),
		};
	}
}

export function createFileMap(
	filepath: string,
	basepath: string,
	type: HTMLChunkType
): HTMLChunk {
	return fileMap(filepath, filepath.split('.'), basepath, type);
}

export function readValidFSTree(dir: string): string[] {
	return readdirSync(dir)
		.map((file) => {
			const filepath = join(dir, file);
			return statSync(filepath).isDirectory()
				? readValidFSTree(filepath)
				: filepath;
		})
		.flat();
}

export const mapPathList = (
	paths: string[],
	base: string,
	type: HTMLChunkType
): HTMLChunk[] => paths.map((file) => createFileMap(file, base, type));

export function usePartials({
	partials = __DEFAULTS__.partials,
	pathRoot = __DEFAULTS__.pathRoot,
	discoverPaths = __DEFAULTS__.discoverPaths,
	experimentalExtensions = false,
}: SSROptions): HTMLChunk[] | null {
	if (!existsSync(join(process.cwd(), pathRoot))) {
		console.error(
			color.fg.red('path root doesnt exist: '),
			`${process.cwd()}/${pathRoot}`
		);
		process.exit(1);
	}
	const root = join(process.cwd(), pathRoot, partials);
	if (!existsSync(root)) {
		console.error(color.fg.red('path root doesnt exist: '), `${root}`);
		process.exit(1);
	}
	if (!discoverPaths)
		return validFileList(root, experimentalExtensions).map((file) =>
			createFileMap(file, partials, 'partial')
		);
	return mapPathList(readValidFSTree(root), partials, 'partial');
}

export function useTemplates({
	templates = __DEFAULTS__.templates,
	pathRoot = __DEFAULTS__.pathRoot,
	discoverPaths = __DEFAULTS__.discoverPaths,
	experimentalExtensions = false,
}: SSROptions): HTMLChunk[] | null {
	if (!existsSync(join(process.cwd(), pathRoot))) {
		console.error(
			color.fg.red('path root doesnt exist: '),
			`${process.cwd()}/${pathRoot}`
		);
		process.exit(1);
	}
	const root = join(process.cwd(), pathRoot, templates);
	if (!existsSync(root)) {
		console.error(color.fg.red('path root doesnt exist: '), `${root}`);
		process.exit(1);
	}
	if (!discoverPaths)
		return validFileList(root, experimentalExtensions).map((file) =>
			createFileMap(file, templates, 'template')
		);
	return mapPathList(readValidFSTree(root), templates, 'template');
}
