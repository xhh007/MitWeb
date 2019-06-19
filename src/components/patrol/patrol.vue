<template>
  <div class="patrol-wrap">
    <div class="table">
      <el-table
        :data="tableData" :header-cell-style="mytableStyle" stripe style="width: 100%" :max-height="tableHeight"
        v-loading="loading" element-loading-text="正在加载，请稍后" element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0,0,0,0.3)">
        <el-table-column prop="routeNmae" label="巡视路线" header-align="center" align="center"> </el-table-column>
        <el-table-column prop="routeType" label="类型"  header-align="center" align="center"> </el-table-column>
        <el-table-column prop="routeTime" label="巡视时间" header-align="center" align="center"> </el-table-column>
        <el-table-column prop="currentSuccessRate" label="当前状态" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.routeState==0" >{{scope.row.currentSuccessRate}}</span>
          <el-progress v-else type="circle" :percentage="scope.row.currentSuccessRate" :width="40"></el-progress>
        </template>
        </el-table-column>
        <el-table-column prop="opera" label="操作" header-align="center" align="center"> 
          <template slot-scope="scope">
            <el-button v-if="scope.row.routeState==0" size="mini" @click="handleRoute(scope.$index,scope.row,1)">启动</el-button>
            <el-button v-else size="mini" type="danger" @click="handleRoute(scope.$index,scope.row,0)">停止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'patrol',
  data () {
    return {
      websocket:null,//websocket
      address:"",//websocket地址端口号
      tableData:[],//表格数据
      tableHeight:(document.documentElement.clientHeight-100)<150?150:(document.documentElement.clientHeight-100),//表格高度
      mytableStyle:{
        "background":"#f1f1f1",
        "color":"#333333"
      },
      loading:false,//表格是否显示加载...
      wsNum:0,//记录重连次数
    }
  },
  created(){
    this.getAllVIRouteInfo();
    this.address=window.location.hostname+":3000/";
    this.initWebSocket();
  },
  computed:{
  },
  mounted(){
  },
  methods:{
    getAllVIRouteInfo(){
      let _this=this;
      this.loading=true;
      _this.$axios.get("action/GetAllVIRouteInfo/").then(res=>{
        _this.loading=false;
        let data=res.data;
        // let data={
        //   routeInfo:[
        //     {routeCode:"200410000191",routeName:"#2主变高压侧",routeState:1,routeTime:"2018/9/5",routeType:"例行巡视",successRate:0},
        //     {routeCode:"200410000190000002",routeName:"#3主变高压侧",routeState:0,routeTime:"2018/9/6",routeType:"例行巡视",successRate:0},
        //     {routeCode:"200410000193",routeName:"#4主变高压侧",routeState:1,routeTime:"2019/1/5",routeType:"例行巡视",successRate:21},
        //     {routeCode:"200410000190000004",routeName:"#5主变高压侧",routeState:0,routeTime:"2019/5/5",routeType:"例行巡视",successRate:0},
        //   ]
        // }
        data.routeInfo.forEach(item=>{
          console.log(item.routeState,item.routeState==0);
          if(item.routeState==0){
            item.currentSuccessRate="未运行";
          }else{
            item.currentSuccessRate=Number(item.successRate);
          }
        })
        this.tableData=data.routeInfo;

      }).catch(err=>{
        _this.loading=false;
        console.log(err);
        _this.$message({
          type: 'error',
          message: err,
          showClose: true
        });	
      })
    },
    initWebSocket(){
      var _this=this;
      if('WebSocket' in window){
        this.websocket=new WebSocket("ws://"+this.address);
      }else if('MozWebSocket' in window){
        this.websocket=new WebSocket("ws://"+this.address);
      }else{
        console.log("当前浏览器不支持websocket");
      }
      this.websocket.onopen = function () {
        console.log("websock连接 状态 ",_this.websocket.readyState);
        let reconnectTimer=null;
        if(_this.websocket.readyState===0){
          if(reconnectTimer){
            clearTimeout(reconnectTimer);
          }
          reconnectTimer=setTimeout(function(){
            _this.initWebSocket();
            reconnectTimer=null;
          },500);
        }
        if(_this.websocket.readyState===1){
          console.log("websock连接成功");
        }
      };
      this.websocket.onmessage = function (message) {
        let data =JSON.parse(message.data);
        console.log(data);
        _this.loading=false;
        if(data.VIRouteInfo.length!=0) {
          data.VIRouteInfo.forEach(item=>{
            if(_this.tableData.length!=0){
              _this.tableData.forEach((op,index)=>{
                if(item.routeCode==op.routeCode){
                  if(item.routeSattion==1){
                    op.routeState=item.routeSattion;
                    op.successRate=item.successRate
                    op.currentSuccessRate=Number(item.successRate);
                  }else{
                    op.routeState=item.routeSattion;
                    op.successRate=item.successRate
                    op.currentSuccessRate="未运行";
                  }
                  Vue.set(_this.tableData,index,op);
                }
              })
            }else{
              _this.getAllVIRouteInfo();
              if(item.routeSattion==1){
                item.currentSuccessRate=Number(item.successRate);
              }else{
                item.currentSuccessRate="未运行";
              }
              _this.tableData.push(item);
            }
          })
        }
      }
      this.websocket.onclose=function(event){
        //断开重连
        _this.reconnect();
      }
    },
    handleRoute(index,row,handle){
      let _this=this;
      // console.log(row);
      let code=row.routeCode;
      let par={
        routeCode:code,
        operationFlag:handle
      }
      this.$axios.get("action/ContrlRoute",{
        params:{
          routeCode:code,
          operationFlag:handle
        }
      }).then(res=>{
        let data=res.data;
        if(data.ret==200){
          _this.getAllVIRouteInfo();
          _this.$message({
            type: 'success',
            message: "操作成功！",
            showClose: true
          });	
        }
      }).catch(err=>{
        _this.$message({
          type: 'error',
          message: err,
          showClose: true
        });	
      })
    },
    //websocket重连
    reconnect(){
      let _this=this;
      // console.log(`重连 ${_this.wsNum} 次`);
      // if(this.wsNum>30){
      //   return false;
      // }
      this.wsNum++;
      this.initWebSocket();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.patrol-wrap{
  width:100%;
  .table{
    width:98%;
    margin:20px auto 0;
  }
}
</style>
