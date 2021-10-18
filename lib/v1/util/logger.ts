import chalk from 'chalk';
import util from 'util';
export const status = ( msg ) => console.log( chalk.blueBright( msg ) );
export const warning = ( msg ) => console.log( chalk.yellow( msg ) );
export const nonFatalErr = ( err ) => console.log( chalk.red( err ) );
export const fatalErr = ( err ) => { throw err };

export const statusObj = ( label, { ...o } ) => {
    console.log( chalk.blue.bold( label ) );
    console.log( );
    Object.entries( o ).forEach( ent => {
        if( typeof( ent[1]) === 'string' ) {
            console.log( chalk.magenta.bold( ent[0] + ':\n' + ent[1] ) )
        }
        if( typeof( ent[1] ) === 'object' ) {
            console.log( chalk.blue.bold( `${ent[0]}: ${chalk.reset.greenBright( util.inspect( ent[1] ) )}` ) );
        }
        
    } );
}