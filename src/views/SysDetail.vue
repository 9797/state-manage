<template lang="pug">
  .detail-box
    .sys-top-title
      .sys-name 系统名称
      .sys-back 返回
    .sys-charts-box
      .chart(ref="chart")
      .prev(@click="dataZoom('reduce')")
      .next(@click="dataZoom('add')")
</template>
<script>
// 默认柱状图
import chartOption from '@/assets/chart.json'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图 
require('echarts/lib/chart/bar')
// 引入折线图
require('echarts/lib/chart/line')
// 引入提示框和图例组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/axisPointer')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/dataZoom')
const step = 5
export default {
  data () {
    return {
      chartOption,
      chart: null
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(this.chartOption)
    let _this = this
    window.addEventListener('resize', () => {
      setTimeout(() => {
        _this.chart.resize()
      }, 500)
    })
  },
  created () {
    // this.chartOption.tooltip.triggerOn = {
    //   'mousemove|click': (params) => {
    //     console.log(params)
    //   }
    // }
  },
  methods: {
    // 数据缩放
    dataZoom (type) {
      let option = this.chartOption
      let dataZoom = option.dataZoom[0]
      let dates = option.xAxis.data
      // 减
      if (type === 'reduce') {
        let newStartValue = dataZoom.startValue - step
        if (newStartValue < dates[0]) return
        dataZoom.startValue = newStartValue
        dataZoom.endValue += step
      } else if (type === 'add') {
        // 加
        console.log('x轴最大值', dates[dates.length-1])
        let newEndValue = dataZoom.endValue + step
        console.log('新的dataZoom.endValue', newEndValue)
        if (newEndValue > dates[dates.length-1]) return
        dataZoom.endValue = newEndValue
        dataZoom.startValue += step
      }
      console.log('缩放后的dataZoom', this.chartOption.dataZoom)
      this.chart.setOption(this.chartOption)
    },
    showTitleTip (params) {
      console.log(params)
      let option = this.chartOption
      option.title.show = true
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', null)
  }
}
</script>
<style lang="less" scoped>
  .detail-box {
    width: 100%;
    height: 100%;
    .sys-top-title {
      height: 64px;
      padding: 0 40px;
      font-size: 20px;
      color: #424751;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FFFFFF;
      box-shadow: 0 8px 15px 0 rgba(71,137,255,0.10);
      .sys-back {
        cursor: pointer;
      }
    }
    .sys-charts-box {
      position: relative;
      margin: 60px 130px;
      height: calc(~"100% - 184px");
      border: 3px dotted #9B9B9B;
      border-radius: 5px;
      .chart {
        width: 100%;
        height: 100%;
      }
      .prev,.next {
        cursor: pointer;
        position: absolute;
        bottom: 15px;
        width: 10px;
        height: 20px;
      }
      .prev {
        background: url(./../assets/left-jiantou.svg) no-repeat left center;
        background-size: cover;
        left: 15px;
      }
      .next {
        background: url(./../assets/right-jiantou.svg) no-repeat left center;
        background-size: cover;
        right: 85px;
      }
    }
  }
</style>

