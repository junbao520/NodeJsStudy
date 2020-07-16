


//cnpm install knex --save

const { request } = require('express');

//cnpm install mysql
const { ddpSuccess } = require('./handle');
var knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'localhost',
    port: '3306',
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
  //分页查询接口
  fastify.post('/user/GetPageData', async (request, reply) => {

      // throw createError(404, 'You are not supposed to reach this.', { header: { 'X-Req-Id': request.id, id: 123 } })
      let page = request.body.page;
      let rows = request.body.rows;
      let sort = request.body.sort;
      let order=request.body.order;
      let wheres = request.body.wheres;
      let tableName ='sys_user';
      let wheresIn=request.body.wheresIn;
      console.log("打印开始2");
      var query = knex.select().from(tableName);
      //集成条件判断查询
      if (wheres != '' && wheres != null) {
        query = query.andWhere(wheres);
      }
      //集成In查询
      if(wheresIn!=''&&wheresIn!=null){
        query=query.whereIn(wheresIn.key, wheresIn.value)
      }
      //集成分页
      query=query.limit(rows).offset((page-1)*rows).orderBy(sort, order);
      //集成范围查询
      let querySql =query.toString();
      console.log(querySql);
      let result = await query;
      console.log("打印完成");
      console.log(new Date());
      console.log(result);

      // throw.error("test");
      //返回结果
      ddpSuccess({reply, result});
      // let WebResponseContent={status:false,code:'',message:'',data:''};
      // WebResponseContent.status=true;
      // WebResponseContent.data=res;
      // return WebResponseContent;

  })
  //添加数据接口
  fastify.post('/user/Add', async (request, reply) => {
    
    //普通接口
    //throw createError(500, 'You are not supposed to reach this.', { header: { 'X-Req-Id': request.id, id: 123 } })
   // let tableName = request.body.tableName;
    let tableName="sys_user1";
    let saveModel=request.body.saveModel;
    saveModel.user_Id=123;
    debugger;
    let result=knex(tableName).insert(saveModel);
    console.log(result.toString());
    result=await result;


    ddpSuccess({reply, result});


  })
  //更新数据接口
  fastify.post('/user/Update', async (request, reply) => {
    //普通接口
    let tableName="sys_user";
    let saveModel=request.body.saveModel;
    let wheres=request.body.wheres;
    //saveModel.user_Id=123;
    let result=knex(tableName).update(saveModel).where(wheres);
    console.log(result.toString());
    result=await result;
    ddpSuccess({reply, result});

  })
 //删除数据接口
  fastify.post('/user/Del', async (request, reply) => {
    //普通接口
    let tableName="sys_user";
    let wheres=request.body.wheres;
    //saveModel.user_Id=123;
    let result=knex(tableName).where(wheres).del()
    console.log(result.toString());
    result=await result;
    ddpSuccess({reply, result});
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


}

module.exports = routes