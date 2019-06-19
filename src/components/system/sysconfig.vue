<template>
  <div class="system-wrap">
    <el-form :model="configData" class="base" label-width="125px" :rules="rules" ref="configData" style="width:50%;margin:50px auto;">
      <!--<el-form-item label="日志输出等级" prop="Loglevel">
        <el-select filterable class="inputStyle" placeholder="" v-model="configData.Loglevel" size="mini">
          <el-option v-for="item in selectOptions.Loglevels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="磁盘最小空间" prop="diskFreeSize">
        <el-input clearable class="inputStyle unitinputStyle" v-model.number="configData.diskFreeSize" size="mini"></el-input>
        <span class="unit">GB</span>
      </el-form-item>
      <el-form-item label="抓图线程数" prop="videoThreadNum">
        <el-input clearable class="inputStyle" size="mini" v-model.number="configData.videoThreadNum"></el-input>
      </el-form-item>
      <el-form-item label="巡视启动方式" prop="startFlag">
        <el-select filterable class="inputStyle" placeholder="" v-model="configData.startFlag" size="mini">
          <el-option v-for="item in selectOptions.startFlags" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接设备方式" prop="getPicFlag">
        <el-select filterable class="inputStyle" placeholder="" v-model="configData.getPicFlag" size="mini">
          <el-option v-for="item in selectOptions.getPicFlags" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启动模拟模式">
        <el-button-group class="" style="float:left;margin-top:6px;">
          <el-button size="mini" :type="configData.PicViewMode==0?'primary':'info'" @click="changeState('0')">OFF</el-button>
          <el-button size="mini" :type="configData.PicViewMode==0?'info':'primary'" @click="changeState('1')">ON</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="摄像机抓图路径" prop="LocalPicPath">
        <el-input clearable class="inputStyle" size="mini"  v-model="configData.LocalPicPath"></el-input>
        <!--<input type="file" nwdirectory >-->
        
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
        // Loglevel:"3",
        diskFreeSize:"",
        videoThreadNum:"",
        startFlag:"0",
        getPicFlag:"0",
        PicViewMode:"0",
        LocalPicPath:""
      },
      selectOptions:{
        Loglevels:[
          {id:"3",name:3},
          {id:"5",name:5},
        ],
        startFlags:[
          {id:"0",name:"巡视计划时间启动"},
          {id:"1",name:"巡视路线时间启动"},
        ],
        getPicFlags:[
          {id:"0",name:"连接主机"},
          {id:"1",name:"连接设备"},
        ]
      },
      rules:{
        // Loglevel:[
        //   {required:true,message:'请选择日志等级',trigger:'blur'}
        // ],
        diskFreeSize:[
          {required:true,message:'请输入磁盘最小空间',trigger:'blur'},
          {type:'number',message:'磁盘最小空间必须为数字值'},
        ],
        videoThreadNum:[
          {required:true,message:'请输入抓图线程数',trigger:'blur'},
          {type:'number',message:'抓图线程数必须为数字值'},
        ],
        startFlag:[
          {required:true,message:'请选择巡视启动方式',trigger:'change'}
        ],
        getPicFlag:[
          {required:true,message:'请选择连接设备方式',trigger:'change'}
        ],
        LocalPicPath:[
          {required:true,message:'请填写摄像机抓图路径',trigger:'blur'}
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
    window.onresize =function(){
      self.screenHeight=document.documentElement.clientHeight;
    }
  },
  methods: {
    changeState(state){
        this.configData.PicViewMode=state;
    },
    getData(){
      var _this=this;
      this.$axios.get("action/GetVIConfig").then(res=>{
        let data=res.data;
        data.diskFreeSize=Number(data.diskFreeSize);
        data.videoThreadNum=Number(data.videoThreadNum);
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
          _this.$axios.get("action/SetVIConfig",{
        params}).then(res=>{
            let data=res.data;
            _this.getData();
            _this.$message({
              type: 'success',
              message: "应用成功！",
              showClose: true
            });	
          }).catch(err=>{
            console.log(err);
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
    width:210px;
    float:left;
    &.unitinputStyle{
      width:180px;
    }
  }
  .unit{
    position:absolute;
    left:185px;
  }
}
</style>
