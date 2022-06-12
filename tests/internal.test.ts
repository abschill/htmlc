import { defaultLoader as i, defaultPartialData, defaultTemplateData } from './fixtures/prepareLoaders';

describe('Internal Config Testing', () => {
	it('loads context', () => {
		expect(i.ctx).toBeDefined();
		expect(i.ctx.config).toBeDefined();
		expect(typeof i.template).toBe('function');
	});

    it('Loads Conf', () => {
        expect(i.ctx.config.pathRoot).toBe('test-pkg/def');
        expect(i.ctx.config.templates).toBe('templates');
        expect(Object.keys(i.ctx.config.templateInput).length).toBeGreaterThan(0);

    });

	it('loads data from constructor into the context', () => {
		expect(i.ctx.config.templateInput).toEqual(defaultTemplateData);
		expect(i.ctx.config.partialInput).toEqual(defaultPartialData);
	});
});
