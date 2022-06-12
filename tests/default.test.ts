import { defaultHome as home, defaultPartialData as partialData } from './fixtures/prepareLoaders';

describe('Example Home Page Tests | ESM', () => {
    it('Types the return correctly', () => {
        expect(typeof(home)).toBe('string');
    });

    it('Compiles all Tokens / No Silent Errors', () => {
        expect(home).not.toMatch('<!--@render');
        expect(home).not.toMatch('<!--@partial');
        expect(home).not.toMatch('<!--@loop');
    });

    it('Loads Partial Data', () => {
        expect(home).toMatch(`<meta name="description" content="${partialData.page_description}"/>`);
        expect(home).toMatch('<html lang="en"');
        expect(home).toMatch(`<title>${partialData.page_title}</title>`);
        expect(home).toMatch('<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">');
    });
});

