#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );
const ssg = require( './program' );
const conf = JSON.parse( fs.readFileSync( path.resolve( process.cwd(), 'package.json' ) ).toString( 'utf-8' ) );
const args = process.argv.slice( 2, process.argv.length ) || [];
if( !conf ) {
    console.log( 'No package.json found at ' + process.cwd() );
    console.log( 'Run npm init -y && npm i html-chunk-loader or npx create-underpin to set up a project' );
}
else {
    ssg( conf, args );
}

