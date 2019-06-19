const control=require('../control');
const getdata=control.getwebservicedata;
const addArgs=control.addArgs;

var getDatabaseInfo = async (ctx,next)=>{
    let args={requestType:"GetDatabaseInfo"}
    let result=await getdata(args);
    ctx.response.body=result;
};
var setDatabaseInfo = async (ctx,next)=>{
    let args={requestType:"SetDatabaseInfo"};
    args=addArgs(args,ctx.request.query);
    let result=await getdata(args);
    ctx.response.body=result;
};
var getVIConfig = async (ctx,next)=>{
    let args={requestType:"GetVIConfig"}
    let result=await getdata(args);
    ctx.response.body=result;
};
var setVIConfig = async (ctx,next)=>{
    let args={requestType:"SetVIConfig"};
    args=addArgs(args,ctx.request.query);
    let result=await getdata(args);
    ctx.response.body=result;
};
var restartVIServer = async (ctx,next)=>{
    let args={requestType:"RestartVIServer"}
    let result=await getdata(args);
    ctx.response.body=result;
};
var clearDisk = async (ctx,next)=>{
    let args={requestType:"ClearDisk"}
    let result=await getdata(args);
    ctx.response.body=result;
};
module.exports={
    'GET /action/GetDatabaseInfo':getDatabaseInfo,
    'GET /action/SetDatabaseInfo':setDatabaseInfo,
    'GET /action/GetVIConfig':getVIConfig,
    'GET /action/SetVIConfig':setVIConfig,
    'GET /action/RestartVIServer':restartVIServer,
    'GET /action/ClearDisk':clearDisk,
}


// function getdata(){
//     console.log("start get webservice......");
//     let url="http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl";
//     let args={byProvinceName:"北京"};
//     // let url="http://127.0.0.1:8888/testService?wsdl";
//     // let args="北京";
//     return new Promise((resolve,reject)=>{
//         soap.createClient(url,function(err,client){
//             // client.test1(args,function(e,r){
//                 client.getSupportCity(args,function(e,r){
//                 if(e){
//                     reject(e);
//                 }else{
//                     console.log("getdata");
//                     let data=JSON.stringify(r.getSupportCityResult.string);
//                     resolve(data);
//                 }
//             })
//         })
//     });
// }
