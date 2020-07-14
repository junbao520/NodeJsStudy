

async function routes(fastify, options) {


    fastify.get('/', async (request, reply) => {
        return { hello: ' fastify get world' }
    })

    fastify.get('/user', async (request, reply) => {
      
        debugger;
        let id = request.id;
        return id;
    })
    fastify.get('/test', function (request, reply) {
        reply.send({ hello: 'test' })
    })

    fastify.route({
        method: 'GET',
        url: '/testQuery',
        schema: {
          querystring: {
            name: { type: 'string' },
            excitement: { type: 'integer' }
          },
          response: {
            200: {
              type: 'object',
              properties: {
                hello: { type: 'string' }
              }
            }
          }
        },
        handler: function (request, reply) {
          reply.send({ hello: 'world' })
        }
      })

    fastify.route({
        method: 'GET',
        url: '/home',
        handler: function (request, reply) {
            let id = request.params.id;
            console.log(id);
            reply.send({ text: 'hello fastify' })
        }
    })
    //暂时无效
// fastify.addHook('onRequest', (req, res, next) => {
//   // some code
//   console.log("onRequest");
//   next()
// })

// fastify.addHook('preHandler', (request, reply, next) => {
//   // some code
//   console.log("preHandler");
//   next()
// })

// fastify.addHook('onResponse', (res, next) => {
//   // some code
//   console.log('onReponse');
//   next()
// })



}

module.exports = routes