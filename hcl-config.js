module.exports = {
    ssr_config: {
        pathRoot: 'test-pkg/barebones',
        partials: 'partials',
        templates: 'templates',
        partialInput: {
            nav3: 'Hello'
        },
        templateInput: {},
        watch: false,
        discoverPaths: false,
        intlCode: 'en',
        debug: {
            logMode: 'silent',
            logStrategy: 'none',
            logFile: null
        }
    },
    ssg_config: {
        pathRoot: 'test-pkg/static',
        partials: 'layout',
        templates: 'pages',
        partialInput: {
            title: 'Hello'
        },
        templateInput: {
            homeContent: 'Hello',
            aboutContent: 'Hello'
        }
    },
    fallbacks: {}
}
