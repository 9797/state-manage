<template lang="pug">
  .home
    LeftMenuBar.left(:menuData="menuData")
    .right-panel(@click="notice = notice + 'sd'")
      Notice(:text="notice")
      .tool-bar
        .sort 故障系统优先
        CheckBox.check(:size="18")
        .clear-message 全部标记为已读
      .state-panel
        .state-item(v-for="item in mock", :class="{warn: item.state === 1, error: item.state === 2}")
          .service
          .name {{item.name}}
          img.state-item-icon(v-if="item.state === 0", src="../assets/right.svg")
          img.state-item-icon(v-if="item.state === 1", src="../assets/warn.svg")
          img.state-item-icon(v-if="item.state === 2", src="../assets/error.svg")
          .mark(v-if="item.message > 0") {{item.message}}
</template>

<script>
import CheckBox from 'check-puge'
import Notice from '@/components/Notice.vue'
import LeftMenuBar from '@/components/LeftMenuBar.vue'

export default {
  name: 'home',
  components: {
    Notice,
    CheckBox,
    LeftMenuBar
  },
  data () {
    return {
      notice: "XX系统于2018-10-12故障，已下发短信提醒。",
      menuData: [
        {to: '/control', icon: '&#xe626;', name: '大屏管理', routerActive: false},
        {to: '/template', icon: '&#xe66a;', name: '模板管理', routerActive: false},
        {
          to: '/dataBase',
          icon: '&#xe630;',
          name: '数据管理',
          showmenu: false,
          children: [
            {
              to: '/dataBase/file',
              name: '文件管理'
            },
            {
              to: '/dataBase/data',
              name: '数据管理'
            }
          ]
        },
        {
          to: '/sms',
          icon: '&#xe64d;',
          name: '短信管理',
          showmenu: false,
          children: [
            {
              to: '/sms/template',
              name: '短信模板'
            },
            {
              to: '/sms/systemList',
              name: '系统管理'
            },
            {
              to: '/sms/sendRecord',
              name: '发送记录'
            }
          ]
        }
      ],
      mock: [
        {name: '系统名称', state: 1, message: 0},
        {name: '系统名称', state: 1, message: 0},
        {name: '系统名称', state: 2, message: 0},
        {name: '系统名称', state: 2, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 3},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0},
        {name: '系统名称', state: 0, message: 0}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .left {
    height: 100%;
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
      background-image: url(../assets/computer.svg)
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
</style>
