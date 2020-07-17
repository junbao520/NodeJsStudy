
/*!
 * dbHelper Based on the basic database query method
 * nodeJs Ling https://www.cnblogs.com/laien/p/5610884.html
 * Copyright (c) 2020, 2024, jun bao.
 * Released under the MIT License.
 */

'use strict';
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

/**
 * getFirst
 * @name getFirst
 * @alias getFirst
 * @param {tableName,wheres} `PageDataOptions`
 * @return {any}
 * @api public
 */
exports.getFirst = async ({ tableName, wheres }) => {
  console.log("getFirst");
  var query = knex.select().from(tableName);
  //集成条件判断查询
  if (wheres != '' && wheres != null && wheres != {}) {
    query = query.andWhere(wheres);
  }
  query = query.limit(1);
  let querySql = query.toString();
  console.log(querySql);
  //没有查询出结果返回 null 后续接口方便判断
  return query;
}
/**
 * getPageData
 * @name getPageData
 * @alias getPageData
 * @param {page,rows,sort,order,wheres,tableName,wheresIn} `PageDataOptions`
 * @return {any}
 * @api public
 */
exports.getPageData = async ({ page, rows, sort, order, wheres, tableName, wheresIn }) => {
  var query = knex.select().from(tableName);
  //集成条件判断查询
  if (wheres != '' && wheres != null && wheres != {}) {
    query = query.andWhere(wheres);
  }
  //集成In查询
  if (wheresIn != '' && wheresIn != null && wheresIn != {}) {
    query = query.whereIn(wheresIn.key, wheresIn.value)
  }
  //集成分页排序
  query = query.limit(rows).offset((page - 1) * rows).orderBy(sort, order);
  let querySql = query.toString();
  console.log(querySql);
  return query;
}

/**
 * add
 * @name add
 * @alias Insert
 * @param {tableName,mainData} `saveModel`
 * @return {any}
 * @api public
 */
exports.add = async ({ tableName, mainData }) => {
  let result = knex(tableName).insert(mainData);
  console.log(result.toString());
  return result;
}
/**
 * update
 * @name update
 * @alias edit
 * @param {tableName,mainData,wheres} `saveModel`
 * @return {any}
 * @api public
 */
exports.update = async ({ tableName, mainData, wheres }) => {
  let result = knex(tableName).update(mainData);
  if (wheres != '' && wheres != null && wheres != {}) {
    result = result.andWhere(wheres);
  }
  else {
    //不允许不带条件更新 抛出异常
    throw new Error('don not have where')

  }
  console.log(result.toString());
  return result;
}
/**
 * Delete
 * @name Delete
 * @alias edit
 * @param {tableName,wheres} `deleteModel`
 * @return {any}
 * @api public
 */
exports.del = ({ tableName, wheres }) => {
  if (wheres != '' && wheres != null && wheres != {}) {
    let result = knex(tableName).where(wheres).del();
    console.log(result.toString());
    return result;
  }
  throw new Error('don not have where')

}

/**
 * execQuery
 * @name query
 * @alias exec sql
 * @param sql `sql`
 * @return {object} `queryResult`
 * @api public
 */
exports.execQuery=(sql)=>{
  return  knex.raw(sql);
}