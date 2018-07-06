<template lang="pug">
  .home
    Tip(v-if="showTip", :tipData="tipData", @hideTip="showTip = false")
    LeftMenuBar.left(:class="{show: showLrftBar}")
    router-view
    .menu.icon(@click="showLrftBar = !showLrftBar") &#xe656;
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
      showLrftBar: false,
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
  .menu {
    display: none;
    position: fixed;
    right: 10px;
    bottom: 10px;
    font-size: 2.4rem;
  }
</style>