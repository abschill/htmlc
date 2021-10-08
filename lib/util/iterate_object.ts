export default function iterateObj( segment, entries ) {
    let shallow = segment;
    Object.entries( entries ).map( ent => {
        shallow = shallow.replace( `{${ent[0]}}`, ent[1] );
    } );
    return shallow;
}