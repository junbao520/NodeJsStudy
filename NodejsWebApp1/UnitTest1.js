var assert = require('assert');
const { getFirst,getPageData,add,update,del,execQuery } = require('./dbhelper');
//npm install mocha -g
//mocha unitTest1.js 运行命令进行单元测试
describe('get First Row Data', async function () {

    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    it('TestGetFirstData', async function () {

        let tableName='sys_user';
        let wheres={
            CreateId: 1
        };
        let result= await getFirst({tableName,wheres});
        console.log(result);
        assert.ok(result!=null, "get First Function is Success");
    });

    it('TestGetPageData',async function () {
       
        let tableName='sys_user';
        let wheres={
            CreateId: 1
        };
        let result=await getPageData({page:1,rows:1,sort:'CreateDate',order:'desc',tableName:'sys_user',wheres})
        console.log("getPageDataLength  "+result.length);
        assert.ok(result.length>=1, "get pageData Eerror");
    });
    it('TestAddData',async function () {
       
        let tableName='sys_user';
        let wheres={
            CreateId: 1
        };
        let saveModel=
        {
            tableName:'sys_user',
            mainData:{User_Id:GetRandomNum(100,10000),Address: '北京', AppType: 0, RoleName:'超级管理员',UserName:'张三',Enable:'1'}
        };
        let result=await add(saveModel);
        console.log("add Suceess "+result);
        assert.ok(result>=1, "add Eerror");
    });
    it('TestUpdateData',async function () {
        let saveModel=
        {
            tableName:'sys_user',
            mainData:{Address: '北京'+GetRandomNum(1,10000), AppType: 0, RoleName:'超级管理员',UserName:'张三',Enable:'1'},
            wheres:{ CreateId:1}
        };
        let result=await update(saveModel);
        console.log("update Suceess "+result);
        assert.ok(result>=1, "update Eerror");
    });
    it('TestDelete',async function () {
       
        //先添加 然后删除
        let saveModel=
        {
            tableName:'sys_user',
            mainData:{User_Id:GetRandomNum(100,10000),Address: '北京', AppType: 0, RoleName:'超级管理员',UserName:'张三',Enable:'1'}
        };
        let id=await add(saveModel);
        console.log("add Complete");
        console.log(`add id ${id}`);


        let deleteModel=
        {
            tableName:'sys_user',
            wheres:{ user_id:id}
        };
        let result=await del(deleteModel);
        console.log("Delete Suceess "+result);
        assert.ok(result>=1, "delete Eerror");
    });
    it('TestExecQuery',async function () {
       
        //先添加 然后删除
       let result=await execQuery('select count(*) from sys_user');
       console.log(result);
    //    console.log(result.toString());
        // console.log(`user  table count: ${result.length}`);
        assert.ok(result!=null, "exec sql Query success");
    });
});
