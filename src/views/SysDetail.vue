<template lang="pug">
  .detail-box
    .sys-back(@click="$router.go(-1)") 返回
    .sys-charts-box
      .chart(ref="chart")
</template>
<script>
import { Fun, Config } from '@/Order.js'
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
      chart: null
    }
  },
  mounted () {
    // 给图表添加渐变色
    chartOption.series[0].areaStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255, 0, 0, 1)'
        }, {
          offset: 0.8,
          color: 'rgba(255, 0, 0, 0.1)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    }
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(chartOption)
    let _this = this
    window.addEventListener('resize', () => {
      setTimeout(() => {
        _this.chart.resize()
      }, 500)
    })
  },
  created () {
    const params = this.$route.params
    Fun.post(`${Config.serve}monitor/bargraph`, {id: params.id, reqmethod: params.reqmethod}, (result) => {
      if (result.err === 0) {
        let chartCopy = chartOption
        let xAxis = []
        let value = result.data.total_time
        result.data.now_time.forEach(element => {
          let time = this.timeAgo(parseInt(element) * 1000)
          xAxis.push(time)
        })
        chartOption.xAxis.data = xAxis
        chartOption.series[0].data = value
        this.chart.setOption(chartOption)
      }
    })
  },
  methods: {
    showTitleTip (params) {
      let option = this.chartOption
      option.title.show = true
    },
    timeAgo (nS) {
      let result = 0
      if (!isNaN) {
        console.error('timeAgo方法传入的参数不是一个数字!')
        return
      }
      const diffValue =  new Date().getTime() - nS
      if (diffValue < 0) return
      const monthC = diffValue / 2592000000
      const weekC = diffValue / (7 * 86400000)
      const dayC = diffValue / 86400000
      const hourC =diffValue / 3600000
      const minC = diffValue / 60000
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前"
      } else if (weekC >= 1) { 
        result = "" + parseInt(weekC) + "周前"
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) +"天前"
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) +"小时前"
      } else if (minC>=1) {
        result = ""+ parseInt(minC) +"分钟前"
      } else {
        result = "刚刚"
      }
      return result;
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
    background-color: white;
    .sys-back {
      top: 0;
      position: fixed;
      right: 0;
      cursor: pointer;
      height: 65px;
      line-height: 65px;
      color: white;
      width: 108px;
      text-align: center;
      font-size: 1.4rem;
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
    }
  }
</style>

