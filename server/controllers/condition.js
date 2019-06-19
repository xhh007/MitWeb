const control=require('../control');
const getdata=control.getwebservicedata;
var getDiskInfo = async (ctx,next)=>{
    let args={requestType:"GetDiskInfo"}
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
var getVIRouteSuccessRate = async (ctx,next)=>{
    let args={requestType:"GetVIRouteSuccessRate"}
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
var getVideoOnLineRate = async (ctx,next)=>{
    let args={requestType:"GetVideoOnLineRate"}
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
var getConnectFailInfo = async (ctx,next)=>{
    let args={requestType:"GetConnectFailInfo"}
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
var getVersion = async (ctx,next)=>{
    let args={requestType:"GetVersion"}
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
module.exports={
    'GET /action/GetDiskInfo':getDiskInfo,
    'GET /action/GetVIRouteSuccessRate':getVIRouteSuccessRate,
    'GET /action/GetVideoOnLineRate':getVideoOnLineRate,
    'GET /action/GetConnectFailInfo':getConnectFailInfo,
    'GET /action/GetVersion':getVersion
}

