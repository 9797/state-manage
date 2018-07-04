<template lang="pug">
  .edit-wrap
    .mark(@click="hideEdit")
    .edit-box
      .option 重命名该组
      .option 新建分组
      .option 删除分组
      .option 添加下级分组
</template>
<script>
export default {
  methods: {
    hideEdit () {
      this.$emit('hideEdit')
    }
  }
}
</script>
<style lang="less" scoped>
  .edit-wrap {
    position: absolute;
  }
  .edit-box {
    position: relative;
    z-index: 10;
    width: 126px;
    box-shadow: 0 0 14px 0 rgba(0, 91, 255, 0.12);
    position: absolute;
    height: auto;
    min-height: 100px;
    background: #ffffff;
    padding: 10px;
    background: url(./../assets/edit-box.png) left center no-repeat;
    background-size: cover;
    border-radius: 5px; 
    .option {
      z-index: 100;
      font-size: 14px;
      color: #686868;
      line-height: 20px;
      cursor: pointer;
      &:hover{
        color: #59ADDA;
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
    background: transparent;
  }
</style>

