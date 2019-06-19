<template>
  <div class="system-wrap">
    <div v-show="!shownodata" ref="camerachart" class="chart" id="camera"></div>
    <div v-show="!shownodata" class="message" style="">
        <p class="item"><span class="title">已使用摄像机数量：</span><span id="all">{{message.usedVideoNum}}</span><span><b>&nbsp;台</b></span></p>
        <p class="item"><span class="title">已使用主机数量：</span><span id="use">{{message.usedHostNum}}</span><span><b>&nbsp;台</b></span></p>
        <p class="item">
          <span class="title">设备连接失败数量：</span>
          <span id="free">{{message.connectFailDevNum}}</span>
          <span><b>&nbsp;台</b></span>
          <el-link v-show="Number(message.connectFailDevNum)>0" type="danger" icon="el-icon-view" @click="cameraDetails" >详情</el-link>
        </p>
    </div>
    <div class="warning" style="">注：此处进行设备在线率统计，只针对巡视中已使用的摄像机，未巡视或巡视中不使用摄像机，此处不做统计</div>
    <el-dialog class="" :title="title" :visible.sync="showProDiv " width="700px">
    <el-table
      :data="details" :header-cell-style="mytableStyle" stripe style="width: 100%" :max-height="tableHeight"
      v-loading="loading" element-loading-text="正在加载，请稍后" element-loading-spinner="el-icon-loading" 
      element-loading-background="rgba(0,0,0,0.3)">
      <el-table-column prop="videoName" width="110" label="摄像机名称" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="videoIP" width="120" label="摄像机IP"  header-align="center" align="center"> </el-table-column>
      <el-table-column prop="port" label="端口号" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="userName" label="用户名" header-align="center" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" header-align="center" align="center"></el-table-column>
      <el-table-column prop="brand" width="120" label="品牌" header-align="center" align="center"></el-table-column>
    </el-table>
    </el-dialog>
    <div v-show="shownodata" class="nodata" >暂无数据</div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Echarts from 'vue-echarts/components/ECharts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// Vue.component('chart',Echarts);

export default {
  name: 'system',
  data () {
    return {
      screenHeight:document.documentElement.clientHeight,
      mychart:null,
      chartData:[],
      message:{},
      details:[],
      tableHeight:(document.documentElement.clientHeight-300)<150?150:(document.documentElement.clientHeight-300),
      mytableStyle:{
        "background":"#f1f1f1",
        "color":"#333333"
      },
      loading:false,
      title:"设备连接失败详细信息",
      showProDiv:false,
      shownodata:false,
    }
  },
  created(){
    this.getData();
  },
  computed:{
  },
  mounted(){
    let _this=this;
    // this.$nextTick(function(){
    //   this.draw();
    // })
    window.onresize =function(){
      _this.screenHeight=document.documentElement.clientHeight;
      _this.mychart.resize();
    }
  },
  methods: {
    getData(){
      let _this=this;
      _this.$axios.get("action/GetVideoOnLineRate").then(res=>{
        console.log(res.data);
        let data=res.data;
        // let data={
        //   usedVideoNum:1280,
        //   usedHostNum:450,
        //   connectFailDevNum:830
        // }
        if(!data||Number(data.usedVideoNum)+Number(data.usedHostNum)==0){
          _this.shownodata=true;
          return;
        }
        _this.message=data;
        let obj1={},obj2={};
        obj1.name="成功";
        obj2.name="失败";
        obj1.value=Number(data.usedVideoNum)+Number(data.usedHostNum);
        obj2.value=Number(data.connectFailDevNum);
        _this.chartData.push(obj1,obj2);
        _this.draw();
      }).catch(err=>{
        _this.shownodata=true;
        _this.$message({
          type: 'error',
          message: err,
          showClose: true
        });	
      })
    },
    draw(){
      let _this=this;
      this.mychart=echarts.init(document.getElementById("camera"));
      this.mychart.setOption({
      title:{
        text:"摄像机在线率"
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: '10%',
          top:"5%",
          data: ['成功','失败']
      },
      series:[{
          name:'在线',
          type:'pie',
          radius:'60%',
          data:_this.chartData
      }],
      color:['#fc8d52', '#91c7ae','#48cfae']
    });
    },
    cameraDetails(){
      var _this=this;
      this.showProDiv=true;
      _this.details=[];
      _this.loading=true;
      _this.$axios.get("action/GetConnectFailInfo").then(res=>{
        console.log(res.data);
        let data=res.data.VideoInfo;
        _this.loading=false;
        // let data=[
        //   {videoName:"摄像机1",videoIP:"127.0.0.1",port:"90",userName:"admin",password:"12345",brand:"hah"},
        //   {videoName:"摄像机2",videoIP:"127.0.0.1",port:"90",userName:"admin",password:"12345",brand:"hah"},
        // ]
        _this.details=data;
      }).catch(err=>{
        _this.loading=false;
        _this.$message({
          type: 'error',
          message: err,
          showClose: true
        });	
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.system-wrap{
  position:relative;
  width:98%;
  margin:20px auto;
  height:90%;
  .chart{
    width:80%;
    margin:0 auto;
    height:85%;
  }
  .message{
    position:absolute;
    top:35px;
    right:10%;
    .item{
      margin-bottom:10px;
      font-size:14px;
      .title{
        font-weight:700;
        display:inline-block;
        width:140px;
        text-align:right;
      }
      b{
        font-weight:700;
      }
    }
  }
  .warning{
    position:absolute;
    bottom:6%;
    right:8%;
    color:#e84c3d;
    font-weight:700;
    font-size:14px;
  }
  .nodata{
    width:80%;
    margin:100px auto 0;
    font-size:16px;
    font-weight:700;
  }
}
</style>
