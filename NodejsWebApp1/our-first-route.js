


//cnpm install knex --save
//cnpm install mysql

var knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '123456',
    database: 'nodejsstudy'
  }
});


async function routes(fastify, options) {


  fastify.get('/', async (request, reply) => {
    return { hello: ' fastify get world' }
  })

  fastify.get('/user', async (request, reply) => {

    debugger;
    let id = request.id;
    return id;
  })
  fastify.post('/user/GetPageData', async (request, reply) => {

    try {
      debugger;
      let toStringQuery = knex.select().from('sys_user').toString();

      console.log("打印开始");
     

      knex.select().from('sys_user').asCallback(function (err, result) {
        debugger;
      
       debugger;
   
      });

      let res=await knex.select().from('sys_user');
      console.log(res);

      console.log("打印完成1");
      console.log(new Date());


      debugger;
      console.log(toStringQuery);

      debugger;
      return res;

    } catch (error) {
      console.log(error);
      return { hello: ' fastify get world' }
    }

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