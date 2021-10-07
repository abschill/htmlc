export default function iterator( txt: string ) {
    const _reggie = /<!--@for\(\w+\){([\s|\w|<|=|"|:|/|\.({})>]+)-->/gi;
    return txt.match( _reggie );
}