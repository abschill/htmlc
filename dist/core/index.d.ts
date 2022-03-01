import { core } from '../loader';
import { internals } from './internals';
declare const render: (declaredPartials: internals.FileInputMeta[], rawFile: internals.fileUTF8, insertMap: internals.UINSERT_MAP, debug?: boolean) => core.template;
export default render;
