/**
 * @module cjs
 * cjs export for require()
 */
const { createLoader } = require('./packages/core');
const { compile } = require('./packages/compiler');
const { tokenize } = require('./packages/compiler/lib/parser');
const Types = require('./packages/types');
module.exports = {
	createLoader,
	compile,
	Types,
	tokenize
}
