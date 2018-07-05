<template lang="pug">
  .tip-box.mark
    .tip
      .title
        span.name {{tipData.title}}
        span.close &times;
      .text-box
        .text
          .name {{tipData.name}}
          input.input(v-model="inputVal")
      .bottom
        .cancel 取消
        .confrim(@click="confrim") 确定
</template>
<script>
import { Fun, Config, Order } from '@/Order.js'
export default {
  data () {
    return {
      inputVal: ''
    }
  },
  props: ['tipData'],
  methods: {
    confrim () {
      this.$emit('hideTip')
      Order.$emit('updataMenu', {
        value: this.inputVal,
        type: this.tipData.type
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .flex-center () {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tip {
    z-index: 11;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background: #FFFFFF;
    box-shadow: 0 2px 27px 0 rgba(0,0,0,0.40);
    .title {
      width: auto;
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
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
    .text-box {
      height: calc(~"100% - 120px");
      .flex-center();
      .text {
        height: 40px;
        .flex-center();
      }
      .name {
        font-size: 16px;
        color: #364960;
      }
      .input {
        width: 346px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #C6CBD4;
        border-radius: 5px;
        outline: none;
        margin-left: 30px;
        font-size: 16px;
        color: #9B9B9B;
      }
    }
    .bottom {
      width: auto;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      line-height: 60px;
      background: rgba(235,235,235,0.50);
      padding-right: 30px; 
      & > div {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
      }
      .confrim {
        background: #364960;
        margin-left: 30px;
        color: #FFFFFF;
      }
      .cancel {
        background: #FFFFFF;
        color: #9B9B9B;
      }
    }
  }
  .mark {
    z-index: 9;
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
