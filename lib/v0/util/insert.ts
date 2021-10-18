export default function insertValue( target: string, delim: string, val:string ) {
    return target.replace( delim, val );
}