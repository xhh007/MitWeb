<template>
	<div class='banner'>
        <el-header class="header" style="">
            后台自动巡视系统配置平台 
        </el-header>
    	<router-view></router-view>
  	</div>
</template>

<script>
export default {
    name:"banner"
}
</script>

<style lang="less">
.banner{
  width:100%;
  .header{
    text-align: center;
    line-height:60px; 
    font-size: 16px;
    font-weight:700;
    color:#eef1f6;
    background:rgb(84, 92, 100);
  }
}
</style>
