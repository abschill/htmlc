export default function countItr( _varList ) {
    const iterable_map = Object.values( _varList ).map( Array.isArray );
    const _iterable_map = iterable_map.filter( _ => _ === true );
    const num_iterables = _iterable_map?.length;
    return num_iterables;
}