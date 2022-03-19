import { RTemplate, FileInputMeta, fileUTF8, UINSERT_MAP } from './internals/types';
declare function render(declaredPartials: FileInputMeta[], rawFile: fileUTF8, insertMap: UINSERT_MAP): RTemplate;
export default render;
