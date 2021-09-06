import Partial from "./prerender/partials";
const p = new Partial( './views/layout/head.html', 0 )

console.log( p.asObject() );