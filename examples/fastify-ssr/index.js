const fastify = require( 'fastify' )()
const Loader = require( 'html-chunk-loader' );
const Handler = new Loader({
    root: 'views',
    templates: 'pages',
    partials: 'partials',
    _partialInput: {
       title: 'Hello World',
       desc: 'Cool Description Bro',
       footer_label: 'Hello from Footer' 
    } 
});
fastify.get('/', async (request, reply) => {
    reply.header( 'content-type', 'text/html' );
    reply.send( Handler.getTemplate( 'home', { content: 'Body Content' } ) );
})
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()