<template lang="pug">
  .home
    Tip(v-if="showTip", :tipData="tipData", @hideTip="showTip = false")
    LeftMenuBar.left
    router-view.right-panel
</template>

<script>
import 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import LeftMenuBar from '@/components/LeftMenuBar.vue'
import { Order, Fun, Config } from '@/Order.js'
import Chart from 'echarts-middleware'
import CheckBox from 'check-puge'
import Tip from '@/components/Tip'
export default {
  name: 'home',
  components: {
    Chart,
    CheckBox,
    Tip,
    LeftMenuBar
  },
  data () {
    return {
      mock: [],
      // 显示提示框
      showTip: false,
      tipData: {},
      chart: null,
      chartData: {
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '70%',
            center: ['50%', '60%'],
            data: [
              { value:335, name:'正常' },
              { value:335, name:'故障' },
              { value:234, name:'错误' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    getData (id) {
      Fun.post(`${Config.serve}monitor/Piechart`, {id}, (res) => {
        console.log('获取到图表数据:', res)
        if (res.err === 0) {
          // this.mock = res.data
          this.chartData.series[0].data[0].value = res.data.normal
          this.chartData.series[0].data[1].value = res.data.fault
          this.chartData.series[0].data[2].value = res.data.error
          // console.log(this.chartData)
          this.chart.setOption(this.chartData)
        }
      })
      Fun.post(`${Config.serve}monitor/get_system_state`, {id}, (res) => {
        console.log('获取到状态数据:', res)
        if (res.err === 0) {
          this.mock = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #ebebeb;
  }
  .right-panel {
    margin: 20px;
    border-radius: 5px;
    position: relative;
    width: calc(100% - 240px);
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
  .state-panel {
    margin: 0 40px;
    padding: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 110px);
  }
  .state-item {
    height: 150px;
    width: 150px;
    float: left;
    margin: 15px;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    background-color: #d3f0d9;
    .service {
      height: 110px;
      background-size: 100px;
      background-position: 25px;
      background-repeat: no-repeat;
      background-image: url(../assets/computer.png);
    }
    .name {
      height: 30px;
      line-height: 30px;
      font-size: 1.2rem;
      text-align: center;
    }
    .state-item-icon {
      width: 25px;
      position: absolute;
      left: 63px;
      top: 37px;
    }
    .mark {
      position: absolute;
      background-color: red;
      width: 50px;
      line-height: 25px;
      color: white;
      text-align: center;
      border-radius: 15px;
      right: -15px;
      top: -15px;
      font-size: 1.2rem;
    }
  }
  .warn {
    background-color: #ffce0e;
  }
  .error {
    background-color: #ff7f7f;
  }
  .chart {
    position: absolute;
    right: 20px;
    top: 20px;
  }
</style>