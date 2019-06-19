<template>
  <div class="system-wrap">
    <div v-show="!shownodata" ref="chart1" class="chart" id="patrol"></div>
    <div v-show="shownodata" class="nodata" >暂无数据</div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Echarts from 'vue-echarts/components/ECharts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
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
      orgOptions: {},
      echartData:{
          colum:[],
          per:[]
      },
      success:[],
      fail:[],
      shownodata:false
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
          var _this=this;
          this.echartData={
              colum:[],
              per:[]
          };
          this.success=[];
          this.fail=[];
          this.$axios.get("action/GetVIRouteSuccessRate").then(res=>{
              let data=res.data.VIRouteInfo;
            //   let data=[
            //       {
            //         "routeCode":"巡视路线code",
            //         "routeName":"巡视路线1",
            //         "VIRouteSuccesNum":"12",
            //         "VIRouteFaillNum":"3",
            //     },
            //       {
            //         "routeCode":"巡视路线code",
            //         "routeName":"巡视路线2",
            //         "VIRouteSuccesNum":"10",
            //         "VIRouteFaillNum":"4",
            //     },
            //       {
            //         "routeCode":"巡视路线code",
            //         "routeName":"巡视路线2",
            //         "VIRouteSuccesNum":"1",
            //         "VIRouteFaillNum":"4",
            //     },
            //   ]
            if(data){
              data.forEach(item=>{
                  let s=Number(item.VIRouteSuccesNum);
                  let f=Number(item.VIRouteFaillNum);
                  _this.echartData.colum.push(item.routeName);
                  _this.echartData.per.push(s*100/(s+f));
                  _this.success.push(s);
                  _this.fail.push(f);
              })
                _this.draw();
            }else{
                _this.shownodata=true;
            }
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
      this.mychart=echarts.init(document.getElementById("patrol"));
      this.mychart.setOption({
        title:{
            text:"巡视成功率"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var res = "";
                var index = params[0].dataIndex;
                _this.echartData.colum.forEach((item,i)=>{
                    if(index===i){
                        res="<p style='font-weight: bold;margin:0;'>"+item+"</p>成功数："+_this.success[i] + "<br>" +"失败数："+_this.fail[i]+ '<br>巡视成功率：' + _this.echartData.per[i] + "%" ;
                    }
                })
                return res;
            }
        },
        legend: {
            data: ['成功数', '失败数']
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: _this.echartData.colum
        },
        series: [
            {
                name: '成功数',
                type: 'bar',
                barMaxWidth:"30px",
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: _this.success
            },
            {
                name: '失败数',
                type: 'bar',
                barMaxWidth:"30px",
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: _this.fail
            },
        ]
    });
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.system-wrap{
  width:98%;
  margin:20px auto;
  height:90%;
  .chart{
    width:80%;
    margin:0 auto;
    height:85%;
  }
  .nodata{
    width:80%;
    margin:100px auto 0;
    font-size:16px;
    font-weight:700;
  }
}
</style>
