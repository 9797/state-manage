<template lang="pug">
  .home
    Tip(v-if="showTip", :tipData="tipData", @hideTip="showTip = false")
    LeftMenuBar.left
    router-view.right-panel
</template>

<script>
import LeftMenuBar from '@/components/LeftMenuBar.vue'
import { Order, Fun, Config } from '@/Order.js'
import Tip from '@/components/Tip'
export default {
  name: 'home',
  components: {
    Tip,
    LeftMenuBar
  },
  data () {
    return {
      showTip: false,
      tipData: {}
    }
  },
  mounted () {
    let _this = this
    Order.$on('showTip', (data) => {
      _this.showTip = true
      _this.tipData = data
    })
  },
  beforeDestroy () {
    Order.$off('showTip')
  }
}
</script>

<style lang="less" scoped>
  .home {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #ebebeb;
  }
  .right-panel {
    width: calc(~"100% - 240px");
    height: calc(~"100% - 40px");
    overflow: auto;
    margin: 20px;
    border-radius: 5px;
    position: relative;
    background-color: white;
    .tool-bar {
      height: 80px;
      margin: 0 70px;
      line-height: 80px;
      font-size: 1.4rem;
      color: #4a4a4a;
      display: flex;
    }
    .check {
      margin: 29px;
    }
  }
</style>