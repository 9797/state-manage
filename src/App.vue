<template lang="pug">
  .app
    .title
      .logo-box
        .logo
        .logo-text LOGO
      Notice(text="XX系统于2018-10-12故障，已下发短信提醒。", :style="noticeStyleList")
    .panel
      router-view
</template>

<script>
import Notice from 'notice-puge'
import { Order, Fun, Config } from '@/Order.js'
export default {
  components: {
    Notice
  },
  mounted () {
    Order.$on('NOTICE', (data) => {
      console.log('--------------------------')
      console.log(data)
      let IDList = []
      data.forEach(element => {
        IDList.push(element.id)
      })
      Fun.post(`${Config.serve}monitor/get_system_notice`, IDList, (res) => {
        console.log('获取到通知数据:', res)
        // if (res.err === 0) {
        //   this.mock = res.data
        // }
      })
    })
  },
  data () {
    return {
      noticeMessage: [],
      noticeStyleList: {
        'line-height': '65px',
        'height': '65px',
        'color': 'white'
      }
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
.title {
  height: 65px;
  width: 100%;
  background: #364960;
  display: flex;
  .logo-box {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ffffff;
      margin-right: 20px;
    }
    .logo-text {
      line-height: 64px;
      font-size: 20px;
      color: #FFFFFF;
    }
  }
}
.panel {
  height: calc(100% - 65px);
  display: flex;
  background-color: #e5e5e5;
}
.left-bar {
  height: 100%;
}
@font-face {
  font-family: 'iconfont';  /* project id 732673 */
  src: url('//at.alicdn.com/t/font_732673_ojirfnnxl57.eot');
  src: url('//at.alicdn.com/t/font_732673_ojirfnnxl57.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_732673_ojirfnnxl57.woff') format('woff'),
  url('//at.alicdn.com/t/font_732673_ojirfnnxl57.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_732673_ojirfnnxl57.svg#iconfont') format('svg');
}
.icon {
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
