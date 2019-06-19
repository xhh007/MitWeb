let log=function(){
    //websocket 服务加打印前缀
    let args=Array.prototype.slice.call(arguments);
    args.unshift("[wsServer]");
    console.log.apply(console,args);
}

module.exports={
    log:log,
}