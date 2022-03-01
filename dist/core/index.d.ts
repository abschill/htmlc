import { core } from '../loader';
import { internals, compiler } from './internals';
declare const render: (declaredPartials: internals.FileInputMeta[], rawFile: internals.fileUTF8, insertMap: compiler.UINSERT_MAP, debug?: boolean) => core.template;
export default render;
