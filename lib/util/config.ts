export default function check_keys( config ) {
    const map0 = config?.partialInput ?? {};
    const cleaned = {...config};
    delete cleaned.partialInput;
    Object.entries( map0 ).forEach( val => {
        Object.keys( val[1] ).forEach( v => {
            if( Object.keys( cleaned ).includes( v ) ) map0[val[0]] = { ...map0[val[0]], [v]: cleaned[v]};
        } );
        cleaned.partialInput = map0;
    } );
    return cleaned;
}