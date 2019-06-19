<template>
  <div class="system-wrap">
    <el-form :model="configData" class="base" label-width="125px" :rules="rules" ref="configData" style="width:50%;margin:50px auto;">
      <el-form-item label="数据库IP" prop="dataBaseIP">
        <el-input clearable class="inputStyle" size="mini" v-model="configData.dataBaseIP"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称" prop="dataBaseName">
        <el-input clearable class="inputStyle" size="mini" v-model="configData.dataBaseName"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input clearable class="inputStyle" size="mini" v-model="configData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable class="inputStyle" size="mini" v-model="configData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="save('configData')">应用</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'system',
  data () {
    return {
      configData:{
        dataBaseIP:"",
        dataBaseName:"",
        username:"",
        password:""
      },
      rules:{
        dataBaseIP:[
          {required:true,message:'请输入数据库ip',trigger:'blur'}
        ],
        dataBaseName:[
          {required:true,message:'请输入数据库名称',trigger:'blur'}
        ],
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ],

      },
    }
  },
  created(){
    this.getData();
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
    getData(){
      var _this=this;
      this.$axios.get("action/GetDatabaseInfo").then(res=>{
        let data=res.data;
        _this.configData=data;
      }).catch(err=>{
          _this.$message({
            type: 'error',
            message: err,
            showClose: true
          });	
      })
    },
    save(name){
      var _this=this;
      _this.$refs[name].validate(valid=>{
        let params={};
        for(let k in this.configData){
          params[k]=this.configData[k];
        }
        if(valid){
          _this.$axios.get("action/SetDatabaseInfo",{
        params}).then(res=>{
            let data=res.data;
            _this.getData();
            _this.$message({
              type: 'success',
              message: "应用成功！",
              showClose: true
            });	
          }).catch(err=>{
            _this.$message({
              type: 'error',
              message: err,
              showClose: true
            });	
          })
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.system-wrap{
  overflow:auto;
  .inputStyle{
    float:left;
    width:210px;
  }
}
</style>
