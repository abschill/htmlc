const { time, timeEnd, log } = console;


export const stamp = ( msg: object | string, label: string ) => {
    time( label );
    log( '\n' );
    log( '~~~~~~~~~~~~~~~~~~' );
    log( msg );
    log( '\n' );
    timeEnd( label );
}
