const fastify = require( 'fastify' )()
const Loader = require( 'html-chunk-loader' );
const templateData = require( './template' );
const Handler = new Loader( {
     root: 'views',
     templates: 'pages',
     partials: 'partials',
     _partialInput: {
         head: {
            title: 'Hello World',
            desc: 'Cool Description',
        },
        footer: {
            title: 'Hello From Footer'
        }
     }
} );
fastify.get('/', async ( request, reply ) => {
    reply.header( 'content-type', 'text/html' );
    reply.send( Handler.getTemplate( 'home', templateData() ) );
})
const start = async () => {
  try {
    await fastify.listen( 3000 )
  } 
  catch ( err ) {
    fastify.log.error( err )
    process.exit( 1 )
  }
}
start()