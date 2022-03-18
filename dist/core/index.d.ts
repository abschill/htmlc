import { RTemplate, FileInputMeta, fileUTF8, UINSERT_MAP } from './internals/types';
declare const render: (declaredPartials: FileInputMeta[], rawFile: fileUTF8, insertMap: UINSERT_MAP, debug?: boolean) => RTemplate;
export default render;
