const { nestedHome } = require('./fixtures/prepareLoaders');

describe('Parses nested token insertions from input', () => {
    it('Gets key/values', () => {
        expect(nestedHome).toMatch('foobar');
        expect(nestedHome).toMatch('Hello World');
        expect(nestedHome).toMatch('Page Title');
        expect(nestedHome).toMatch('Page Subtitle');
    });
    it('Doesnt silent error', () => {
        expect(nestedHome).not.toMatch('undefined');
        expect(nestedHome).not.toMatch('<!--@render');
        expect(nestedHome).not.toMatch('<!--@partial');
        expect(nestedHome).not.toMatch('<!--@loop');
    });
});
