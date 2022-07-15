import { highLoad_Loader as myLoader, highLoadChunk0 as chonk } from './fixtures/prepareLoaders';

describe('Beefi Chonky Boi give or take lol', () => {
    it('Loads es lang attribute', () => {
        expect(chonk).toMatch('<html lang="en_ES"');
    });

    it('registers discovered partials in template', () => {
        expect(myLoader.ctx.chunks.filter(chunk => chunk.type === 'partial').filter(partial => partial.name.includes('/')).length).toBe(4);
    });

    it('Loads Nest', () => {
        expect(chonk).toMatch('<p>baz</p>');
        expect(chonk).toMatch('<p>ee</p>');
        expect(chonk).toMatch('Lorem ipsum dolor sit amet');
        expect(chonk).toMatch('Partial One');
        expect(chonk).toMatch('Hello World');
        expect(chonk).toMatch('Partial Two');
        expect(chonk).toMatch('Partial four');
        expect(chonk).toMatch('chonk');
        expect(chonk).toMatch('Generic Page Content');
        for(const num of [1,2,3,4,5,6,7,8]) {
            expect(chonk).toMatch(`chonk${num}`);
        }
    });

    it('Compiles all Inputs', () => {
        expect(chonk).not.toMatch('<!--@render');
        expect(chonk).not.toMatch('<!--@partial');
        expect(chonk).not.toMatch('<!--@loop');
    });

    it('Has no silent errors', () => {
        expect(chonk.includes('undefined')).toBeFalsy();
    });
});
