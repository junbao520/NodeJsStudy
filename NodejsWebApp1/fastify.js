const fastify = require('fastify')({
  logger: true
})

// 声明路由
fastify.get('/search1', function (request, reply) {
  debugger;
  reply.send({ hello: 'worldSearch' })
})

fastify.post('/login', function (request, reply) {
  debugger;
  let userName=request.userName;
  let passworld=request.passworld;
  
  reply.send({ hello: 'worldSearch' })
})


//注册路由
fastify.register(require('./our-first-route'))
//fastify.register(require('./our-first-route/user'))

// 启动服务！
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})