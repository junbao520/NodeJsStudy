/* 公共解析器 */

// 0: 错误提醒， 2： 没权限
// {
//   statusCode: number
//   code?: string
//   error: string
//   message: string
// }
//ES6 对象匹配传参
exports.ddpSuccess = ({ reply, statusCode = 200, message = '请求成功', result = null }) => {
    reply.send({ statusCode, message, result });
};