export function testInp( _tester, input ) {
    if( typeof( input ) !== 'string' ) {
        //is array
        //@ts-ignore
        input.forEach( entry => {
            if( typeof( entry ) !== 'object' ) {
                //entry is value
                expect( _tester ).toContain( entry ); 
               
            }
            else {
                //entry is obj
                Object.values( entry ).forEach( val => {
                    expect( _tester ).toContain( val );
                } );
            }
        } );
    }
    else {
        //is value map
        expect( _tester ).toContain( input );
    }
}