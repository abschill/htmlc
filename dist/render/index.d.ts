import { Runtime } from '../loader';
import { hclFS, coreInternal } from './internals';
declare const render: (declaredPartials: hclFS.FileInputMeta[], rawFile: hclFS.fileUTF8, insertMap: coreInternal.UINSERT_MAP, debug?: boolean) => Runtime.template;
export default render;
