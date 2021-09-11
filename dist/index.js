"use strict";
// import Config from './config'
// const c = new Config();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.Partial = exports.Controller = void 0;
// c.getPartials().forEach( p => {
//     switch( p.name ){
//         case 'head':
//             p.parse(
//                 [ 
//                     { title: 'This is a Test' }, 
//                     { desc: 'This is a Description' }
//                 ] 
//                 );
//                 break;
//         case 'footer':
//             p.parse(
//                 [
//                     { footerTitle: 'Hello World' }
//                 ]
//             )
//         default:
//             break;
//     }
// });
// c.getTemplates().forEach( t => {
//     t.parse( [{ content: 'Body Content'}])
// } );
// console.log( c.getTemplates()[0].parsed );
exports.Controller = __importStar(require("./config"));
exports.Partial = __importStar(require("./partial"));
exports.Template = __importStar(require("./template"));
//# sourceMappingURL=index.js.map