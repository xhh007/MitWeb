const control=require('../control');
const getdata=control.getwebservicedata;
const addArgs=control.addArgs;

// console.log(getdata());
let getAllVIRouteInfo = async (ctx,next)=>{
    let args={requestType:"GetAllVIRouteInfo"};
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
};
let contrlRoute=async (ctx,next)=>{
    let args={requestType:"ContrlRoute"};
    args=addArgs(args,ctx.request.query);//加访问webservice的参数
    let result=await getdata(args);
    ctx.response.status=result.errCode;
    ctx.response.body=result;
}

module.exports={
    'GET /action/GetAllVIRouteInfo':getAllVIRouteInfo,
    'GET /action/ContrlRoute':contrlRoute
}