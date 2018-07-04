<template>
  <div class="app">
    <LeftMenuBar class="left" :menuData="menuData" />
    <router-view/>
  </div>
</template>

<script>
import LeftMenuBar from '@/components/LeftMenuBar.vue'
export default {
  components: {
    LeftMenuBar
  },
  data () {
    return {
      menuData: [
        {to: '/control', icon: '&#xe626;', name: '大屏管理', routerActive: false},
        {to: '/template', icon: '&#xe66a;', name: '模板管理', routerActive: false},
        {
          to: '/dataBase',
          icon: '&#xe630;',
          name: '数据管理',
          showmenu: false,
          children: [
            {
              to: '/dataBase/file',
              name: '文件管理'
            },
            {
              to: '/dataBase/data',
              name: '数据管理'
            }
          ]
        },
        {
          to: '/sms',
          icon: '&#xe64d;',
          name: '短信管理',
          showmenu: false,
          children: [
            {
              to: '/sms/template',
              name: '短信模板'
            },
            {
              to: '/sms/systemList',
              name: '系统管理'
            },
            {
              to: '/sms/sendRecord',
              name: '发送记录'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less">
html, body, .app, .box {
  height: 100%;
  width: 100%;
  position: relative;
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
  font-size: 14px;
  overflow: hidden;
}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
  margin: 0;
  padding: 0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.app {
  display: flex;
  background-color: #e5e5e5;
}
.left-bar {
  height: 100%;
}
</style>
