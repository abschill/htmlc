import { Runtime } from '../loader';
import { hclFS, hclInternal } from './internals';
declare const render: (declaredPartials: hclFS.FileInputMeta[], rawFile: hclFS.fileUTF8, insertMap: hclInternal._insertMap, debug?: boolean) => Runtime.template;
export default render;
