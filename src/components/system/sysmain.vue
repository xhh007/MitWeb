<template>
  <div class="system-wrap" v-loading="loading" element-loading-text="正在处理，请稍后" element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0,0,0,0.3)">
    <div class="box">
        <div class="banner">重启</div>
        <el-button class="btn" size="mini" type="primary" @click="RestartVIServer()">重启</el-button>重新启动后台巡视程序
    </div>
    <div class="box">
        <div class="banner">清理磁盘空间</div>
        <el-button class="btn" size="mini" type="primary" @click="ClearDisk()">清理</el-button>清空磁盘中运行产生的抓图
    </div>
    <div class="message">
        说明：重新启动程序后，需要刷新界面获取最新数据，请求等到1~2分钟后刷新
    </div>
  </div>
</template>

<script>
export default {
  name: 'system',
  data () {
    return {
      screenHeight:document.documentElement.clientHeight,
      loading:false,
    }
  },
  created(){
  },
  computed:{
  },
  mounted(){
    let self=this;
    // this.screenHeight=document.documentElement.clientHeight;
    window.onresize =function(){
      self.screenHeight=document.documentElement.clientHeight;
    }
  },
  methods: {
    RestartVIServer(){
      var _this=this;
      _this.loading=true;
      this.$axios.get("action/RestartVIServer").then(res=>{
        let data=res.data;
        if(data.ret==200){
          _this.$message({
            type: 'success',
            message: "操作成功！",
            showClose: true
          });	
        }
        _this.loading=false;
      }).catch(err=>{
      _this.loading=false;
        _this.$message({
          type: 'error',
          message: err,
          showClose: true
        });	
      })
    },
    ClearDisk(){
      var _this=this;
      _this.loading=true;
      this.$axios.get("action/ClearDisk").then(res=>{
        let data=res.data;
        if(data.ret==200){
          _this.$message({
            type: 'success',
            message: "操作成功！",
            showClose: true
          });	
        }
        _this.loading=false;
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
  height:90%;
  width:98%;
  margin:0 auto;
  padding:20px 0;
  text-align:left;
  .box{
    width:95%;
    margin:0 auto;
    padding:10px 0;
    font-size:14px;
    .banner{
      height:36px;
      line-height:36px;
      background-color:#e4e4e4;
      padding-left:10px;
      font-size:16px;
      font-weight: bold;
      margin-bottom:15px;
    }
    .btn{
      margin-right:20px;
    }
  }
  .message{
    position:absolute;
    bottom:12%;
    left:3.5%;
    font-size:14px;
    color:#e84c3d;
    font-weight:700;
  }
}
</style>
