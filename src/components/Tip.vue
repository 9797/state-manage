<template lang="pug">
  .tip-box.mark
    .tip
      .title
        span.name  dsdasd
        span.close &times;
    
</template>
<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .tip-box {
    
  }
  .tip {
    z-index: 11;
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background: #FFFFFF;
    box-shadow: 0 2px 27px 0 rgba(0,0,0,0.40);
    .title {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 60px;
      padding: 0 30px;
      background: rgba(235,235,235,0.50);
      .name {
        font-size: 18px;
        color: #364960;
      }
      .close {
        color: #C6CBD4;
      }
    }
  }
  .mark {
    z-index: 9;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
</style>
