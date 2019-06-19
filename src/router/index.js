import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import banner from '@/components/banner'
import patrol from '@/components/patrol/patrol'
import baseconfig from '@/components/system/baseconfig'
import sysconfig from '@/components/system/sysconfig'
import sysmain from '@/components/system/sysmain'
import camera from '@/components/condition/camera'
import distuse from '@/components/condition/distuse'
import patrolsuccess from '@/components/condition/patrolsuccess'
import about from '@/components/about/about'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: banner,
      children:[
        {
          path:'/',
          name:'index',
          component:index,
          children:[
            {
              path:"/patrol",
              alias:"",
              component:patrol,
              name:"巡视路线"
            },
            {
              path:"/baseconfig",
              component:baseconfig,
              name:"基本配置"
            },
            {
              path:"/sysconfig",
              component:sysconfig,
              name:"系统配置"
            },
            {
              path:"/sysmain",
              component:sysmain,
              name:"系统维护"
            },
            {
              path:"/camera",
              component:camera,
              name:"摄像机在线率"
            },
            {
              path:"/distuse",
              component:distuse,
              name:"磁盘使用率"
            },
            {
              path:"/patrolsuccess",
              component:patrolsuccess,
              name:"巡视成功率"
            },
            {
              path:"/about",
              component:about,
              name:"关于"
            }]
        }
      ]
    }
  ]
})
