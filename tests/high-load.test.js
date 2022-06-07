const { highLoad_Loader, highLoadChunk0 } = require('./fixtures/prepareLoaders');

describe('Beefi Chonky Boi give or take lol', () => {
    it('Loads es lang attribute', () => {
        expect(highLoadChunk0).toMatch('<html lang="en_ES"');
    });

    it('registers discovered partials in template', () => {
        expect(highLoad_Loader.ctx.chunks.filter(chunk => chunk.type === 'partial').filter(partial => partial.name.includes('/')).length).toBe(4);
    });

    it('Loads Nest', () => {
        expect(highLoadChunk0).toMatch('<p>baz</p>');
        expect(highLoadChunk0).toMatch('<p>ee</p>');
        expect(highLoadChunk0).toMatch('Lorem ipsum dolor sit amet');
        expect(highLoadChunk0).toMatch('Partial One');
        expect(highLoadChunk0).toMatch('Hello World');
        expect(highLoadChunk0).toMatch('Partial Two');
        expect(highLoadChunk0).toMatch('Partial four');
        expect(highLoadChunk0).toMatch('chonk');
        expect(highLoadChunk0).toMatch('Generic Page Content');
        for(const num of [1,2,3,4,5,6,7,8]) {
            expect(highLoadChunk0).toMatch(`chonk${num}`);
        }
    });

    it('Compiles all Inputs', () => {
        expect(highLoadChunk0).not.toMatch('<!--@render');
        expect(highLoadChunk0).not.toMatch('<!--@partial');
        expect(highLoadChunk0).not.toMatch('<!--@loop');
    });

    it('Has no silent errors', () => {
        expect(highLoadChunk0.includes('undefined')).toBeFalsy();
    });
});
