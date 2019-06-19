const soap=require("soap");
const fs=require("fs");

let url="";
fs.readFile(__dirname+'/app.json','utf-8',function(err,data){
    if(err){
        console.log(err);
    }else{
        let config=JSON.parse(data).webservice;
        url=config.ip+":"+config.port+"/"+config.wsdl;
    }
})
module.exports={
    getwebservicedata:function (args){
        console.log("start get webservice......");
        console.log(url);
        if(!url){
            return {"errCode":400,"ret":"连接错误"}
        }
        // let url="http://192.168.101.87:7722/MITSVIWebService/MITSVIWebService?wsdl"
        return new Promise((resolve,reject)=>{
            soap.createClient(url,function(err,client){
                // console.log(client.describe());
                if(!client || typeof client.doRequest!="function"){
                    reject("500 服务连接错误");
                }
                let params=JSON.stringify(args).toString();
                try{
                    console.log(params);
                    client.doRequest({"parm":params},function(e,r){//doRequest getSupportCity add
                        if(e){
                            reject(e);
                        }else{
                            console.log("getdata");
                            let data=JSON.parse(r.result);
                            data.errCode=200;
                            // console.log(data);
                            resolve(data);
                        }
                    })
                }catch(e){
                    console.log(e);
                }
                
            })
        });
    },
    addArgs:function(args,obj){
        if(!obj){
            return args;
        }
        for(let o in obj){
            args[o]=obj[o];
        }
        return args;
    }
}