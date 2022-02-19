const { time, timeEnd, log } = console;

export const stampLog = ( msg: object | string, label: string, showLabel ?: boolean ) => {
    time( label );
    log( '\n' );
    log( '~~~~~~~~~~~~~~~~~~' );
    log( msg );
    log( '\n' );
    timeEnd( label );
}