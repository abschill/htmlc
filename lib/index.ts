
// import Config from './config'
// const c = new Config();



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

export * as Controller from './config';
export * as Partial from './partial';
export * as Template from './template';