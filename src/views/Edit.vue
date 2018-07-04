<template lang="pug">
  .edit-box
    .systems
      .title-bar
        .title 全部系统
        .return 返回
      .card-box
        .card(v-for="item in 20") 系统名称
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
    height: 500px;
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
      background-color: #9DBAFC;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
</style>