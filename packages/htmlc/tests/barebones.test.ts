import { barebones_Loader as myLoader } from './fixtures/prepareLoaders';

describe('Barebones: No Config Options Entered inline', () => {
    const home = myLoader.template('home');
    it('Loads Page Content', () => {
        expect(home).toMatch('<h1>Home Page</h1>');
        expect(home).toMatch('<li>Nav 1</li>');
        expect(home).toMatch('<li>Nav 2</li>');
        expect(home).toMatch('<nav>');
        expect(home).toMatch('</nav>');
        expect(home).toMatch('<h1>Home Page</h1>');
        expect(home).toMatch('<footer>Footer</footer>');
    });


    it('Intl and body', () => {
        expect(home).toMatch('lang="en"');
        expect(home).toMatch('<body');
        expect(home).toMatch('</body>');
    });
});
