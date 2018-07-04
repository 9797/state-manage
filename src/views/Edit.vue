<template lang="pug">
  .edit-box
    .systems
      .title-bar
        .title 全部系统
        .return 返回
      .card-box
        .card(v-for="item in 20")
          span 系统名称
          .tool.reduce -
          // .tool.add +
    .menu-systems
      .title-bar
        .title 该菜单下的系统
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
  .edit-box {
    width: 100%;
    
  }
  .title-bar {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #364960;
    display: flex;
    line-height: 50px;
    font-family: PingFangSC-Medium;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .systems {
    border-radius: 5px;
    background-color: white;
    margin: 20px;
    padding: 20px;
    height: 600px;
  }
  .menu-systems {
    border-radius: 5px;
    background-color: white;
    margin: 20px;
    padding: 20px;
    height: calc(~"100% - 740px");
  }
  .card-box {
    .card {
      float: left;
      height: 40px;
      width: 160px;
      margin: 10px;
      line-height: 40px;
      padding: 0 10px;
      border-radius: 20px;
      position: relative;
      background-color: #3FBAFB;
      font-size: 16px;
      color: #FFFFFF;
    }
    .tool {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 6px;
      background: #28AEF5;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
    }
  }
</style>