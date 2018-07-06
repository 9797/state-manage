<template lang="pug">
  .edit-box
    .systems
      .title-bar
        .sys-title 全部系统
        .return(@click="$router.back()") 返回
      .card-box
        .card(v-for="item in sysList", :class="{added : item.isAdded}")
          span {{item.name}}
          .tool.add(@click="addSys(item)") +
    .menu-systems(v-if="groupData.id")
      .title-bar
        .sys-title {{groupData.lv1}} &gt; {{groupData.lv2}} &gt; {{groupData.lv3}}
      .card-box
        .card(v-for="item in addedSysList")
          span {{item.name}}
          .tool.reduce(@click="reduceSys(item)") -
</template>

<script>
import { Fun, Config } from '@/Order.js'
export default {
  data () {
    return {
      sysList: [],
      addedSysList: [],
      groupData: {}
    }
  },
  created () {
    let queryData = this.$route.params
    this.groupData = queryData
    this.getSysList()
  },
  methods: {
    // 获取sys列表
    getSysList () {
      let _this = this
      Fun.post(`${Config.serve}monitor/query_group_system_list`, {id: this.groupData.id}, (res) => {
        if (res.err === 0) {
          let sysListTmp = Fun.deepClone(res.data)
          let sysListGroup = sysListTmp.group
          Object.keys(sysListTmp).forEach((key1) => {
            let item1 = sysListTmp[key1]
            let editKey = null
            sysListGroup.forEach((item2) => {
              if (item1.sys_id === item2.sys_id) {
                editKey = key1
              }
            })
            if (editKey) {
              sysListTmp[editKey].isAdded = true
            } else {
              item1.isAdded = false
            }
          })
          delete sysListTmp.group
          _this.sysList = sysListTmp
          this.addedSysList = res.data.group
        }
      })
    },
    // 增加
    addSys (sysObj) {
      let _this = this
      if (sysObj.isAdded) return
      Fun.post(`${Config.serve}monitor/insert_group_system`, {
        sys_id: sysObj.sys_id,
        group_id: this.groupId
      }, (res) => {
        if (res.err === 0) {
          _this.getSysList()
        }
      })
    },
    // 删除
    reduceSys (sysObj) {
      let _this = this
      Fun.post(`${Config.serve}monitor/delete_group_system`, {
        sys_id: sysObj.sys_id,
        group_id: this.groupId
      }, (res) => {
        if (res.err === 0) {
          _this.getSysList()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-box {
    border-radius: 0;
    background: transparent;
  }
  .title-bar {
    height: 29px;
    width: auto;
    padding-bottom: 10px;
    font-size: 20px;
    color: #364960;
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 40px;
    .return {
      cursor: pointer;
    }
  }
  .systems {
    height: auto;
    min-height: 400px;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .menu-systems {
    min-height: 400px;
    height: auto;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 20px;
    height: auto;
  }
  .card-box {
    overflow: hidden;
    .card {
      float: left;
      height: 40px;
      width: 150px;
      margin: 10px;
      line-height: 40px;
      padding: 0 10px 0 20px;
      border-radius: 20px;
      position: relative;
      background-color: #3FBAFB;
      font-size: 16px;
      color: #FFFFFF;
      &.added {
        background: #F4F4F4;
        span {
          color: #9B9B9B;
        }
        .tool {
          background: rgba(235,235,235,0.89);
        }
      }
    }
    .tool {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 6px;
      background: #28AEF5;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
    }
  }
</style>