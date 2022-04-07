/**
 * @module cjs
 * cjs export for require()
 */
const { createLoader } = require( './lib/loader' );
module.exports = createLoader;