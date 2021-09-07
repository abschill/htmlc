import Template from './template';
import Partial from "./partial";
import Parser from './parser';
const p = new Partial( './views/layout/head.html', { order:0 }, [{ title:'Test Title', desc: 'This is a description' }] )
const p0 = new Partial( './views/layout/footer.html', { order: 1 } );
const t = new Template( [p, p0] , 'ssr' );
const parser = new Parser( t );

parser.run()

console.log( p.content );
//console.log( parser._meta() );
//t.render()