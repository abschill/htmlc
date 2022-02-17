import { Runtime } from '../loader';
import { FileInputMeta } from '../internals';
declare const template: (declaredPartials: FileInputMeta[], rawFile: string, insertMap: object, debug?: boolean) => Runtime.template;
export default template;
