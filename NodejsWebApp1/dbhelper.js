
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
 * getPageData
 * @name getPageData
 * @alias getPageData
 * @param {page,rows,sort,order,wheres,tableName,wheresIn} `PageDataOptions`
 * @return {any}
 * @api public
 */
module.exports = async function getPageData({page,rows,sort,order,wheres,tableName,wheresIn}) {
  // let page = PageDataOptions.page;
  // let rows = PageDataOptions.rows;
  // let sort = PageDataOptions.sort;
  // let order = PageDataOptions.order;
  // let wheres = PageDataOptions.wheres;
  // let tableName = PageDataOptions.tableName;
  // let wheresIn = PageDataOptions.wheresIn;
  var query = knex.select().from(tableName);
  //集成条件判断查询
  if (wheres != '' && wheres != null&&wheres!={}) {
    query = query.andWhere(wheres);
  }
  //集成In查询
  if (wheresIn != '' && wheresIn != null&&wheresIn!={}) {
    query = query.whereIn(wheresIn.key, wheresIn.value)
  }
  //集成分页排序
  query = query.limit(rows).offset((page - 1) * rows).orderBy(sort, order);
  let querySql = query.toString();
  console.log(querySql);
  return await query;
}
/**
 * getPageData
 * @name getPageData
 * @alias getPageData
 * @param {page,rows,sort,order,wheres,tableName,wheresIn} `PageDataOptions`
 * @return {any}
 * @api public
 */
module.exports = async function getFirst({tableName,wheres}) {
  var query = knex.select().from(tableName);
  //集成条件判断查询
  if (wheres != '' && wheres != null&&wheres!={}) {
    query = query.andWhere(wheres);
  }
  query = query.limit(1);
  let querySql = query.toString();
  let res=await query;
  console.log(querySql);
  //没有查询出结果返回 null 后续接口方便判断
  return res=={}?null:res;
}
/**
 * add
 * @name add
 * @alias Insert
 * @param {tableName,mainData} `saveModel`
 * @return {any}
 * @api public
 */
module.exports = async function add({ tableName, mainData }) {
  let result = knex(tableName).insert(mainData);
  console.log(result.toString());
  return await result;
}

/**
 * update
 * @name update
 * @alias edit
 * @param {tableName,mainData,wheres} `saveModel`
 * @return {any}
 * @api public
 */
module.exports = async function update({ tableName, mainData, wheres }) {
  let result = knex(tableName).update(saveModel);
  if (wheres != '' && wheres != null && wheres != {}) {
    result = result.andWhere(wheres);
  }
  console.log(result.toString());
  return await result;
}
/**
 * Delete
 * @name del
 * @alias edit
 * @param {tableName,wheres} `deletModel`
 * @return {object} `saveModel`
 * @api public
 */
module.exports = async function del({ tableName, wheres }) {
  let result=knex(tableName).where(wheres).del();
  console.log(result.toString());
  return await result;
}
/**
 * Delete
 * @name del
 * @alias edit
 * @param {tableName,wheres} `deletModel`
 * @return {object} `saveModel`
 * @api public
 */
module.exports=async function execQuery(sql){
  return await knex.raw(sql);
}