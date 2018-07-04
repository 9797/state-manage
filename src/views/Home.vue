<template lang="pug">
  .home
<<<<<<< HEAD
    .right-panel(@click="notice = notice + 'sd'")
=======
    LeftMenuBar.left
    .right-panel(@click.self="notice = notice + 'sd'")
>>>>>>> b1009ea4e5d0475a413f2503f5adf18b6137d635
      Notice(:text="notice")
      .tool-bar
        .sort 故障系统优先
        CheckBox.check(:size="18")
        .clear-message 全部标记为已读
      .state-panel
        .state-item(v-for="item in mock", :class="{warn: item.state === 1, error: item.state === 2}", @click="$router.push('/sysdetail')")
          .service
          .name {{item.name}}
          img.state-item-icon(v-if="item.now === 0", src="../assets/right.png")
          img.state-item-icon(v-if="item.now === 1", src="../assets/warn.png")
          img.state-item-icon(v-if="item.now === 2", src="../assets/error.png")
          // .mark(v-if="item.message > 0") {{item.message}}
    .chart
      Chart(:opt="chartData", :size="{w: 400, h: 180}")
</template>

<script>
import 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import { Fun, Config } from '@/Order.js'
import Chart from 'echarts-middleware'
import CheckBox from 'check-puge'
import Notice from 'notice-puge'
export default {
  name: 'home',
  components: {
    Chart,
    Notice,
    CheckBox
  },
  data () {
    return {
      notice: "XX系统于2018-10-12故障，已下发短信提醒。",
      mock: [],
      chartData: {
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['50%', '60%'],
            data: [
              { value:335, name:'正常服务' },
              { value:310, name:'错误服务' },
              { value:234, name:'已经关机' }
            ]
          }
        ]
      }
    }
  },
  created () {
    Fun.get(`${Config.serve}get_system_state`).then((res) => {
      console.log(res)
      if (res.err === 0) {
        this.mock = res.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    width: calc(100% - 200px);
    display: flex;
  }
  .right-panel {
    height: 100%;
    width: calc(~"100% - 200px");
    .tool-bar {
      height: 60px;
      margin: 0 70px;
      line-height: 60px;
      font-size: 1.4rem;
      color: #4a4a4a;
      display: flex;
    }
    .check {
      margin: 19px;
    }
    .clear-message {
      color: #6db7df;
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .state-panel {
    margin: 0 40px;
    padding: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 200px);
  }
  .state-item {
    height: 150px;
    width: 150px;
    float: left;
    margin: 15px;
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
    position: fixed;
    right: 0;
    top: 0;
  }
</style>
