import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { HTMLChunk } from 'htmlc-types';

export function ensureOutPath(outPath: string): void {
	return existsSync(outPath) ? null : mkdirSync(outPath);
}

export function pathify(template: HTMLChunk, contextPath: string): string {
	const toName = `${template.name}.html`;
	return path.resolve(path.resolve(process.cwd(), contextPath), toName);
}

export function __write(args: { toName: string; toWrite: string }): number {
	writeFileSync(args.toName, args.toWrite);
	return 0;
}
