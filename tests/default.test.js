const { defaultHome, defaultPartialData } = require( './fixtures/prepareLoaders');

describe('Example Home Page Tests | ESM', () => {
    it('Types the return correctly', () => {
        expect(typeof(defaultHome)).toBe('string');
    });

    it('Compiles all Tokens / No Silent Errors', () => {
        expect(defaultHome).not.toMatch('<!--@render');
        expect(defaultHome).not.toMatch('<!--@partial');
        expect(defaultHome).not.toMatch('<!--@loop');
    });

    it('Loads Partial Data', () => {
        expect(defaultHome).toMatch(`<meta name="description" content="${defaultPartialData.page_description}"/>`);
        expect(defaultHome).toMatch('<html lang="en"');
        expect(defaultHome).toMatch(`<title>${defaultPartialData.page_title}</title>`);
        expect(defaultHome).toMatch('<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">');
    });
});

