

async function routes(fastify, options) {


    fastify.get('/', async (request, reply) => {
        return { hello: ' fastify get world' }
    })

    fastify.get('/user', async (request, reply) => {
      
        let id = request.id;
        return id;
    })
    fastify.get('/test', function (request, reply) {
        reply.send({ hello: 'test' })
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




}

module.exports = routes