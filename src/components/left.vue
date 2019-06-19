<template>
<el-menu background-color="#50575f" text-color="#fff" active-text-color="#ffd04b"
      :default-active="activePath"  router unique-opened>
        <el-menu-item index="/patrol">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>巡视路线</span>
              </template>    
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-tools"></i>系统配置</template>
          <!-- <el-menu-item-group> -->
            <el-menu-item index="/baseconfig">基本配置</el-menu-item>
            <el-menu-item index="/sysconfig">系统配置</el-menu-item>
            <el-menu-item index="/sysmain">系统维护</el-menu-item>
          <!-- </el-menu-item-group> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>数据统计</span>
          </template>
          <!-- <el-menu-item-group> -->
            <el-menu-item index="/distuse">磁盘使用</el-menu-item>
            <el-menu-item index="/patrolsuccess">巡视成功率</el-menu-item>
            <el-menu-item index="/camera">摄像机在线率</el-menu-item>
          <!-- </el-menu-item-group> -->
        </el-submenu>
        
        <el-menu-item index="/about">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>关于</span>
          </template>    
        </el-menu-item>
      </el-menu>
</template>
<script>
export default {
  computed:{
    activePath(){
      return this.$route.path=="/"?"/patrol":this.$route.path;
    }
  },
}
</script>