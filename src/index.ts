
import Config from './config'
const c = new Config();

console.log( c.getPartials() );

console.log( c.getTemplates() );

// c.getPartials().forEach( p => {
//     switch( p.name ){
//         case 'head':
//             p.parse(
//                 [ 
//                     { title: 'This is a Test' }, 
//                     { desc: 'This is a Description' } ,
//                     { footerTitle: 'This is a Footer Title' }
//                 ] 
//                 );
//         default:
//             break;
//     }
// });
// c.getTemplates().forEach( t => {
//     t.parse( [{ content: 'Body Content'}])
//     console.log( t.parsed );
// } );