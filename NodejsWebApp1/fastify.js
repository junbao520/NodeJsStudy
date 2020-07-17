const fastify = require('fastify')({
  logger: true,
  file: 'log.txt'
})
//明天先研究权限模块
//第一步  安装jwt cnpm i fastify-jwt --save 
const jwt = require('fastify-jwt')

//npm install fastify-errors-properties --save
//全局异常处理
//const createError = require('http-errors')

//第二步注册 jwt
fastify.register(jwt, { secret: 'supersecret' })

//第三步 登录生成token
fastify.post('/login',  async function (request, reply) {
  try {
    let data={
      userName:request.body.userName,
      role:'Admin'
    }
    let altSignOptions = Object.assign({}, fastify.jwt.options.sign)
    altSignOptions.issuer = 'another.example.tld'
    //有效期5000秒
    altSignOptions.expiresIn="5000000"
    const tokenAlt = await reply.jwtSign(data, altSignOptions)

    var replyData={success:true,data:tokenAlt,message:''};

    reply.send(replyData)
  } catch (error) {
    var replyData={success:false,data:'',message:error};
    reply.send(replyData)
  }
})
//允许通过的白名单 正则表达式匹配
const whitelistedRoutes = [
  '/login',
  '/docs',
  '/user/GetPageData',
  '/user/Add',
  '/user/Update',
  '/user/Del'
];


//第四步 添加钩子函数 请求之前拦截,钩子函数的请求声明周期在中间件之前
//请求之前添加钩子函数进行Jwt 验证
fastify.addHook('onRequest', async (request, reply) => {
  try {
    if (whitelistedRoutes.every((whitelistedRoute) => {
      return !request.req.url.match(new RegExp(whitelistedRoute));
    })) {
      //await request.jwtVerify();
      request.jwtVerify(function (err, decoded) {
        if(!err){
           //解密后的信息保存在Request中
           request.data=decoded;
           console.log(decoded);
        }
        else{
          reply.send(err);
        }
      
      })
    }
  } catch (err) {
    reply.send(err);
  }
});

//第五步 测试访问，需要 header authorization Bearer +Token 访问
fastify.get('/test', function (request, reply) {
  //获取token信息
  console.log(request.data);
  reply.send(request.data)
})
//注册路由
fastify.register(require('./our-first-route'))
// 启动服务！
fastify.listen(3000, function (err, address) {
  if (err) {
    //可以考虑写日志
    fastify.log.error(err);
    console.log("333333333333333333333");
    //判断下如果是自定义异常则直接抛出
    throw err;
  

  }
  fastify.log.info(`server listening on ${address}`)
})