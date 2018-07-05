<template lang="pug">
  .right-panel
    .tool-bar
      .sort 故障系统优先
      CheckBox.check(:size="18")
    .state-panel
      .state-item(v-for="item in mock", :class="{warn: item.now === 1, error: item.now === 2}", @click="$router.push('/sysdetail/' + item.id + '/' + item.reqmethod)")
        .service
        .name {{item.name}}
        img.state-item-icon(v-if="item.now === 0", src="../assets/right.png")
        img.state-item-icon(v-if="item.now === 1", src="../assets/warn.png")
        img.state-item-icon(v-if="item.now === 2", src="../assets/error.png")
        // .mark(v-if="item.message > 0") {{item.message}}
    .chart
      Chart(:opt="chartData", :size="{w: 300, h: 100}", v-model="chart")
</template>

<script>
import 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import LeftMenuBar from '@/components/LeftMenuBar.vue'
import { Order, Fun, Config } from '@/Order.js'
import Chart from 'echarts-middleware'
import CheckBox from 'check-puge'
export default {
  name: 'home',
  components: {
    Chart,
    CheckBox,
    LeftMenuBar
  },
  data () {
    return {
      mock: [],
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
  created () {
    this.getData(this.$route.params.id)
  },
  methods: {
    getData (id) {
      // console.log(this.$route.params.id)
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
      Fun.post(`${Config.serve}monitor/get_system_state`, {group_id: id}, (res) => {
        console.log('获取到状态数据:', res)
        if (res.err === 0) {
          this.mock = res.data
          setTimeout(() => {
            Order.$emit('NOTICE', res.data)
          }, 0)
        }
      })
    }
  },
  watch: {
    '$route.params.id' (value) {
      this.getData(this.$route.params.id)
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