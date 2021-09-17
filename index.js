const Controller  = require( './dist' );
const templateHandler = new Controller();
templateHandler.getPartials().forEach( p => {
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
//render page to template string
console.log( templateHandler.getTemplate( 'home', { content: 'Body Content' } ) );


