# nodeJs 入门笔记

## vsCode 调试错误

![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\Users\757114760\QQ\WinTemp\RichOle\EX(}2~A}O)1S}EO%SBI1JA6.png)

错误解决方案：是由于没有找到node的运行路径手动配置。

vsCode 中launch.json  "runtimeExecutable": "C:/Program Files/nodejs/node",

参考网站：https://blog.csdn.net/foupwang/article/details/87905607?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-12.nonecase

## Node自动重启工具 nodemon

```undefined
cnpm install -g  nodemon
```



## NodeJs 权限管理设计思路 Jwt授权

1.路由请求规则按照.netCore 的路由设置。方便解析出请求指向的数据表。

2.方法命名规则按照 add edit delete search 作为方法的前缀。方便进行方法的权限控制。

3.考虑采用开源的acl或者rbca 作为权限看控制。

4.redis和内存缓存 两种方式尽量抽象出接口。进行权限缓存。

5.使用中间件进行 权限的认证。

jwt资料

https://stackoverflow.com/questions/61716895/using-fastify-onrequest-hook-for-jwt-validation

https://ask.csdn.net/questions/759309

## 路由和日志

fastify 框架默认post只支持json格式提交

https://www.cnblogs.com/smartXiang/p/7728575.html

## Fastify 生命周期

Incoming Request (请求到达)
  │
  └─▶ Instance Logger (实例化 Logger)
        │
        └─▶ Routing （路由匹配）
             │
       404 ◀─┴─▶ onRequest Hook (onRequest钩子)
                  │
        4**/5** ◀─┴─▶ run Middlewares （执行中间件）
                        │
              4**/5** ◀─┴─▶ Parsing （解析请求对象）
                             │
                       415 ◀─┴─▶ Validation (验证)
                                   │
                             400 ◀─┴─▶ preHandler Hook (preHandler钩子)
                                         │
                               4**/5** ◀─┴─▶ beforeHandler
                                               │
                                     4**/5** ◀─┴─▶ User Handler
                                                     │
                                                     └─▶ Reply （响应）
                                                          │ │
                                                          │ └─▶ Outgoing Response （发出响应）
                                                          │
                                                          └─▶ onResponse Hook （onResponese钩子



## knex

mysql8.0会报错

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '123456';

let data=await knex.select().from('sys_user');

knex.select().from('sys_user'); 这句话本身不执行查询！由于mysql是事件驱动，异步模式。

