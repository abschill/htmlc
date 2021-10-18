export default function iterateObj( segment:string, entries:object ) {
    let shallow: string = segment;
    Object.entries( entries ).map( ent => {
        shallow = shallow.replace( `{${ent[0]}}`, ent[1] );
    } );
    return shallow;
}