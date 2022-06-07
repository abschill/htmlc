const { defaultLoader } = require('./fixtures/prepareLoaders');

describe('Internal Config Testing', () => {
    it('Loads Conf', () => {
        expect(defaultLoader.ctx.config.pathRoot).toBe('test-pkg/def');
        expect(defaultLoader.ctx.config.templates).toBe('templates');
        expect(Object.keys(defaultLoader.ctx.config.templateInput).length).toBeGreaterThan(0);
    });
});
