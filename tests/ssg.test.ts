import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { _static_config } from '../package.json';
const { outPath } = _static_config;
const toRun = process.argv.length === 2
beforeAll( () => {
    if( toRun ) {
        exec( `bash scripts/runTests.sh ${outPath}`, () => {
            return;
        } );
    }
    else{
        return;
    }
} );
describe( 'Test SSG CLI with default config', () => {
    if( toRun ) {
        it( 'home works', () => {
            expect( fs.readFileSync( path.resolve( process.cwd(), outPath, 'home.html' ) ) ).toBeTruthy();
        })
        it( 'about works', () => {
            expect( fs.readFileSync( path.resolve( process.cwd(), outPath, 'about.html' ) ) ).toBeTruthy();
        })
    }
    else {
        it( 'works', () => {
            expect( 1 ).toBe( 1 );
        })
    }
    
} );