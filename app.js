// koa 入口文件
const fs=require('fs');
const Koa=require("koa");
const router=require("koa-router")();
const bodyParser=require("koa-bodyparser"); //解析POST数据
const soap=require("soap");
const app=new Koa();
app.use(bodyParser());
// const log=require('./server/config').log;
const path=require('path'),
      static=require('koa-static');


//处理 url 开始
// console.log(__dirname);
var files=fs.readdirSync(__dirname+'/server/controllers');//读controllers目录下所有文件

var js_files=files.filter(f=>{
    return f.endsWith(".js");
});//找所有js文件

//处理每个js文件
for(var f of js_files){
    // console.log(`from controller: ${f}`);
    //导入js文件
    let mapping=require(__dirname+'/server/controllers/'+f);
    for(var url in mapping){
        // console.log(url);
        if(url.startsWith('GET ')){
            let path=url.substring(4);
            router.get(path, mapping[url]);
        }else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}
//处理 url 结束

app.listen(9000);
app.use(router.routes());
app.use(static(path.resolve('dist')));
console.log("koa is listening 9000");
// setTimeout(connectwebservice,1000);
//websocket 
// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({
    port: 3000
});
// console.log(wss);
var WebSocketEx=null;//暴露ws接口,供webservice中收到请求使用。
wss.on('connection', function (ws) {
    console.log(`...前端连接websocket成功，后台有数据过来就推送给前端...`);
    // ws.on('message', function (message) {
    //     console.log(` Received: ${message}`);
        
    // });
    WebSocketEx=ws;
});
//websocket 结束
//web端作为服务器
const http = require('http');
const web={};
web.wsdl = fs.readFileSync('static/webInterface.wsdl', 'utf8');
web.server=null;
web.service={
    doRequest:{
        doRequest:{
            patrol:function(params,cb,soapHeader){
                // console.log("...后台来数据了，马上推送...");
                let args={};
                if(params.data){
                    if(params.data.$value){
                        args=JSON.parse(params.data.$value);
                    }else{
                        args=JSON.parse(params.data);
                    }
                }else{
                    args=params;
                }
                if(!args.requestType || args.requestType!=="updateRouteState"){
                    return {result:'400 No such interface'};
                }
                console.log(args);
                // console.log("............WebSocketEx............",WebSocketEx);
                if(WebSocketEx!=null){//调用websocket服务端向前端推数据
                    WebSocketEx.send(`${JSON.stringify(args)}`, (err) => {
                        if (err) {
                            // console.log(`[SERVER] error: ${err}`);
                            console.log(` error: ${err}`);
                        }
                    });
                }
                return {result:'200 ok'};
            }
        }
    }
}
web.server=http.createServer(function(request,response){
    response.end('404: Not Found:'+request.url);
});
web.server.listen(8285);
soap.listen(web.server,'/doRequest',web.service,web.wsdl);
console.log("webservice sarted at port 8285");

// console.log("每隔1秒自动访问8285，模拟后台推送,记录访问次数");
// var count=0;
// setInterval(connectwebservice,1000);

function connectwebservice(){
    // count++;
    // console.log("..start get data............");
    // const url1="http://192.168.101.248:8285/doRequest?wsdl";
    const url1="http://192.168.101.87:7722/MITSVIWebService/MITSVIWebService?wsdl";
    soap.createClient(url1,function(err,client){
        if(!client){
            console.log("connect error ...");
            return;
        } 
        if(err){
            console.log(`..........${JSON.stringify(err)}`);
        }
        let args={
            requestType:"GetDatabaseInfo",
            // URL:"success",
            // VIRouteInfo:[
            //     {routeCode:200410000191,routeSattion:1,successRate:0+count<100?(1+count):100},
            //     {routeCode:200410000193,routeSattion:1,successRate:21+count<100?(21+count):100},
            // ]
        }
        let params=JSON.stringify(args).toString();
        // VIRouteInfo:[
        //     {routeCode:200410000191,routeSattion:1,successRate:0+count<100?(1+count):100},
        //     {routeCode:200410000193,routeSattion:1,successRate:21+count<100?(21+count):100},
        // ]
        console.log(params);
        client.doRequest({"parm":params},function(e,r){//testStdString patrol
            if(e){
                console.log(`meathod err... ${JSON.stringify(e)}`);
            }else{
                console.log(`result: ${JSON.stringify(r)}`);
                // console.log(r);
            }
        });
    });
}


/*
//ws 模块实现 websocket 客户端
let ws = new WebSocket('ws://localhost:3000/');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    // ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    // let msg=JSON.stringify(message);
    console.log(`[CLIENT] Received...: ${message}`);
})
*/



/*
//一个webservice客户端练习
let url1="./static/WeatherWebService.wsdl";
let args={byProvinceName:"北京"};

soap.createClient(url1,function(err,client){
    console.log(client.describe());
        client.getSupportCity(args,function(e,r){
        if(e){
            console.log(".........",e);
        }else{
            console.log("..........getdata");
            let data=JSON.stringify(r.getSupportCityResult.string);
            console.log(data);
        }
    })
})
*/

// router.get('/',async(ctx,next)=>{
//     let result=await getdata();
//     console.log("```````````",result);
//     ctx.response.body=result;
// });


//一个 webservice 服务-练习
// const soap_server=require('soap-server');
// function MyTestService(){

// }
// MyTestService.prototype.test1=function(args1){
//     return args1+"123456";
// }
// const soapServer=new soap_server.SoapServer();
// const soapService=soapServer.addService('testService',new MyTestService());
// soapServer.listen(8285);
//一个 webservice 练习结束