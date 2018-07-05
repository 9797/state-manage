<template lang="pug">
  .edit-wrap
    .mark(@click="hideEdit")
    .edit-box
      .option(@click="editGroup") 重命名该组
      .option(@click="addGroup") 新建分组
      .option 删除分组
      .option 添加下级分组
    .tip-box
</template>
<script>
import { Fun, Config, Order } from '@/Order.js'
export default {
  methods: {
    // 隐藏编辑组件
    hideEdit () {
      this.$emit('hideEdit')
    },
    // 新增
    addGroup () {
      this.hideEdit()
      let data = {
        type: 'add',
        showTip: true,
        title: '新增分组',
        name: '分组名称：'
      }
      this.showTip(data)
    },
    // 修改
    editGroup () {
      this.hideEdit()
      let data = {
        type: 'edit',
        showTip: true,
        title: '重命名分组',
        name: '分组名称：'
      }
      this.showTip(data)
    },
    // 显示提示框
    showTip (data) {
      Order.$emit('showTip', data)
    }
  },
  beforeDestroy () {
    Order.$off('showTip')
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
    height: auto;
    padding: 40px 20px 20px;
    background: url(./../assets/edit-box.png) no-repeat;
    background-size: 100% 100%;
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

