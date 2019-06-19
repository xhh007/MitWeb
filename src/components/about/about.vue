<template>
  <div class="contentWrap">
    <div class="version">
			<div class="pic">
      	<img src="/static/img/logo_into.png" alt="北京殷图">
			</div>
			<div class="message" style="">
				<div class="title">多维系统后台自动巡视配置管理平台</div>
				<div class="ver">版本号：<span class="num">{{version}}</span></div>
			</div>
			<div class="company" style="">北京殷图网联科技股份有限公司</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'patrol',
  data () {
    return {
      screenHeight:document.documentElement.clientHeight,
      version:""
    }
  },
  created(){
    this.getData();
  },
  computed:{
  },
  mounted(){
    let self=this;
  },
  methods: {
    getData(){
      let _this=this;
      this.$axios.get("action/GetVersion").then(res=>{
        let data=res.data;
        _this.version=data.AppVersion;
      }).catch(err=>{
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
.contentWrap{
  width:98%;
  margin:10px auto;
  .version{
    position:relative;
    min-width:430px;
    width:50%;
    height:260px;
    margin:100px auto;
    background: #0071c1;
    padding:10px 0 15px;
    text-align:center;
    border-radius:15px;
    box-shadow:0 0 10px 2px #aaa;
    color:#f9f9f9;
    .pic{
      box-sizing:border-box;
      width:30%;
      height:80%;
      float:left;
      padding:10px;
      img{
        width:150px;
      }
    }
    .message{
      box-sizing:border-box;
      float:right;
      width:70%;
      height:80%;
      padding:20px 0 0 8%;
      text-align:left;
      .title{
        font-size:16px;
        line-height:16px;
        margin-bottom:30px;
      }
      .ver{
        font-size:14px;
      }
    }
    .company{
      clear:both;
      margin-top:10px;
      font-size:14px;
      font-weight:700;
    }
    }
  }
	
		
</style>
