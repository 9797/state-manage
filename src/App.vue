<template>
  <div class="app">
    <router-view/>
  </div>
</template>

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
@font-face {
  font-family: 'iconfont';  /* project id 732673 */
  src: url('//at.alicdn.com/t/font_732673_6ujho44aj77.eot');
  src: url('//at.alicdn.com/t/font_732673_6ujho44aj77.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_732673_6ujho44aj77.woff') format('woff'),
  url('//at.alicdn.com/t/font_732673_6ujho44aj77.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_732673_6ujho44aj77.svg#iconfont') format('svg');
}
.icon{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
