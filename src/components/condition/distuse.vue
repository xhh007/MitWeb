<template>
  <div class="system-wrap">
    <div ref="distchart" class="chart" id="pie" ></div>
    <div class="message" style="">
        <p class="item"><span class="title">磁盘总空间：</span><span id="all">{{message.diskGross}}</span><span><b>&nbsp;GB</b></span></p>
        <p class="item"><span class="title">已使用空间：</span><span id="use">{{message.usedSpace}}</span><span><b>&nbsp;GB</b></span></p>
        <p class="item"><span class="title">空闲空间：</span><span id="free">{{message.freeSpace}}</span><span><b>&nbsp;GB</b></span></p>
    </div>
    <div class="warning" style="">注：巡视数据保存在D盘，此处只针对D盘进行统计</div>
    <div v-show="shownodata" class="nodata" >暂无数据</div>

  </div>
</template>

<script>
// import Vue from 'vue';
// import Echarts from 'vue-echarts/components/ECharts';//vue-echarts 
// import echarts from 'echarts'; //全部引入
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
      screenHeight:document.documentElement.clientHeight-60,
      mychart:null,
      chartData:[],
      message:{},
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
      _this.screenHeight=document.documentElement.clientHeight-60;
      _this.mychart.resize();
    }
  },
  methods: {
    getData(){
      let _this=this;
      _this.$axios.get("action/getDiskInfo").then(res=>{
        console.log(res.data);
        let data=res.data;
        // let data={
        //   diskGross:1280,
        //   usedSpace:450,
        //   freeSpace:830
        // }
        if(!data||Number(data.diskGross)==0){
          _this.shownodata=true;
          return;
        }
        _this.message=data;
        let obj1={},obj2={};
        obj1.name="已使用";
        obj2.name="空闲";
        obj1.value=Number(data.usedSpace);
        obj2.value=Number(data.freeSpace);
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
      // console.log(this.$refs)
      this.mychart=echarts.init(document.getElementById("pie"));
      this.mychart.setOption({
        title:{
          text:"磁盘使用率"
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} GB ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: '10%',
            top:"5%",
            data: ['已使用','空闲']
        },
        series:[{
            name:'磁盘',
            type:'pie',
            radius:'60%',
            data:_this.chartData
        }],
        color:['#fc8d52', '#91c7ae','#48cfae']
      });
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
        width:90px;
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
}
</style>
