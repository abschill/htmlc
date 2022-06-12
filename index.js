/**
 * @module cjs
 * cjs export for top level convenience
 */
const {
	useLoader,
	createLoader
} = require('./lib/index.js');

module.exports = {
	useLoader,
	createLoader //keep this in for backwards compatibility
};
