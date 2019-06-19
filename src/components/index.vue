<template>
  <div class="index-wrap" :style="{ height: screenHeight + 'px' }">
    <div class="left-side">
      <left></left>
    </div>
    <div class="right-side">
      <router-view style="width:100%;height:100%;"></router-view>
    </div>
  </div>
</template>

<script>
import left from './left.vue'
// <div class="content-wrap" :style="{ height: screenHeight-60 + 'px' }">
export default {
  name: 'HelloWorld',
  data () {
    return {
      screenHeight:document.documentElement.clientHeight-60,
      routeList:[],//面包屑导航表
    }
  },
  created(){
    // this.getRoutePaths();
  },
  components:{
    left,
  },
  mounted(){
    let self=this;
    // this.screenHeight=document.documentElement.clientHeight;
    window.onresize =function(){
      console.log(self.screenHeight);
      self.screenHeight=document.documentElement.clientHeight-60;
    }
  },
  methods:{
    getRoutePaths(){
      console.log(this.$route);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.index-wrap{
  width:100%;
  .left-side,.right-side{
    position:absolute;
    bottom:0;
    top:60px;
    &.left-side{
      overflow-y:auto;
      left:0;
      background-color: #50575f;
      text-align:left;
    }
    &.right-side{
      right:0;
      overflow-y:hidden;
    }
  }
  @media (max-width:1000px){
    .left-side{
      width:14rem;
    }
    .right-side{
      left:14rem;
    }
  }
  @media (min-width:1000px) and (max-width:1200px){
    .left-side{
      width:15rem;
    }
    .right-side{
      left:15rem;
    }
  }
  @media (min-width:1200px){
    .left-side{
      width:16rem;
    }
    .right-side{
      left:16rem;
    }
  }
}


  // .content-wrap{
  //   .left-side{
  //     position:absolute;
  //     top:60px;
  //     bottom:0;
  //     left:0;
  //     width:200px;
  //     background-color: rgb(238, 241, 246);
  //   }
  //   .right-side{
  //     position:absolute;
  //     top:60px;
  //     bottom:0;
  //     left:200px;
  //     right:0
  //   }
  // }
</style>
