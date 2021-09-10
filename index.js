const Controller = require( './dist/config' ).default;

const c = new Controller();
c.getPartials().forEach( p => {
   
    switch( p.name ){
        case 'head':
            p.parse(
                [ 
                    { title: 'This is a Test' }, 
                    { desc: 'This is a Description' }
                ] 
                );
                break;
        case 'footer':
            p.parse(
                [
                    { footerTitle: 'Hello World' }
                ]
            )
        default:
            break;
    }
});

c.getTemplates().forEach( t => {
    t.parse( [{ content: 'Body Content'}])
} );
console.log( c.getTemplates()[0].parsed );


