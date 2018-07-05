<template lang="pug">
  //- 左侧二级菜单栏
  .left-menu-bar
    //编辑菜单
    MenuEdit(ref="edit", v-show="showEditFlag", @hideEdit="showEditFlag = false")
    // 一级
    .item-box(v-for="(menuLv1, key1, index1) in menuData", v-if="menuLv1")
      .item-wrap.lv1
        .text(@click.prevent.stop.self="unfold(menuLv1)")
          .icon.unfold(v-if="menuLv1.isunfold") &#xe656;
          .icon.unfold(v-else) &#xe643; 
          p.name {{menuLv1.group_name}}
        .icon.options(@click.prevent.stop.self="showEdit") &#xe7a8;
      // 二级
      .menu-lv2-box(v-show="menuLv1.isunfold")
        .menu-lv2(v-for="(menuLv2, key2, index2) in menuLv1.son", v-if="menuLv2")
          .item-wrap.lv2
            .text(@click.prevent.stop.self="unfold(menuLv2)")
              .icon.unfold(v-if="menuLv2.isunfold") &#xe656;
              .icon.unfold(v-else) &#xe643;
              p.name {{menuLv2.group_name}}
            .icon.options(@click.prevent.stop.self="showEdit") &#xe7a8;
          // 三级
          .menu-lv3-box(v-show="menuLv2.isunfold")
            .menu-lv3(v-for="(menuLv3, key3, index3) in menuLv2.son", v-if="menuLv3")
              .item-wrap.lv3(:class="{active:menuLv3.isSelect}")
                .text(@click.prevent.stop.self="getLv3Detail(menuLv3)")
                  // .icon.unfold &#xe643;
                  p.name {{menuLv3.group_name}}
                .icon.options(@click.prevent.stop.self="showEdit") &#xe7a8;
</template>

<script>
import { Fun, Config, Order } from '@/Order.js'
import MenuEdit from '@/components/MenuEdit'
export default {
  data () {
    return {
      // 分组的数据
      menuData: [],
      showEditFlag: false
    }
  },
  created () {
    this.getGroup()
  },
  mounted () {
    let _this = this
    Order.$on('updataMenu', (data) => {
      if (data.type === 'add')
      _this.addMenu(data.value)
      if (data.type === 'edit')
      _this.editMenu(data.value)
    })
  },
  components: {
    MenuEdit
  },
  methods: {
    // 获取列表
    getGroup () {
      let _this = this
      Fun.post(`${Config.serve}group/query_group_list`, {}, (result) => {
        if (result.err === 0) {
          let data = result.data
          for (let key in data) {
            let item1 = data[key]
            if (!item1) continue
            item1['isunfold'] = false
            for (let key2 in item1.son) {
              let item2 = item1.son[key2]
              if (!item2) continue
              item2['isunfold'] = false
              for (let key3 in item2.son) {
                let item3 = item2.son[key3]
                if (!item3) continue
                item3.isSelect = false
              }
            }
          }
          console.log(data)
          _this.menuData = data
        }
      })
    },
    // 新增菜单
    addMenu (groupName) {
      let _this = this
      Fun.post(`${Config.serve}group/insert_group`, {
        group_name: groupName
      }, (result) => {
        if (result.err === 0) {
          _this.getGroup()
        }
      })
    },
    editMenu () {
      let _this = this
      Fun.post(`${Config.serve}group/insert_group`, {
        group_name: groupName
      }, (result) => {
        if (result.err === 0) {
          _this.getGroup()
        }
      })
    },
    // 展开和隐藏
    unfold (menu) {
      menu['isunfold'] = !menu['isunfold']
    },
    // 显示编辑组件
    showEdit ($event) {
      this.showEditFlag = true
      let edit = this.$refs.edit.$el
      let pos = {
        left: $event.target.offsetLeft - 146,
        top: $event.target.offsetTop + 10
      }
      edit.style.left = pos.left + 'px'
      edit.style.top = pos.top + 'px'
    },
    // 显示系统详情
    getLv3Detail (prams) {
      let data = this.menuData
      for (let key in data) {
        let item1 = data[key]
        for (let key2 in item1.son) {
          let item2 = item1.son[key2]
          for (let key3 in item2.son) {
            let item3 = item2.son[key3]
            if (item3.group_id === prams.group_id) {
              console.log(item3)
              console.log(prams)
              item3.isSelect = true
            } else {
              item3.isSelect = false
            }
          }
        }
      }  
    }
  }
}
</script>

<style lang="less" scoped>
  .left-menu-bar {
    position: relative;
    transition: width 0.5s;
    width: 200px;
    box-shadow: 7px 0px 10px #edf3ff;
    background: #ffffff;
    // 分组
    .item-box {
      width: 100%;
      height: auto;
      align-items: center;
      user-select: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease-out;
      letter-spacing: 0;
      // 二级分组
      .menu-lv2 {
        height: auto;
        .item-wrap {
          padding-left: 30px;
          .name {
            font-size: 16px;
            color: #666666;
          }
        }
      }
      // 三级分组
      .menu-lv3 {
        .item-wrap {
          padding-left: 60px;
          &.active, &:hover {
            padding-left: 55px;
            border-left: 5px solid #0CAAFF;
            background: #F5F5F5;
          }
          .name {
            font-size: 16px;
            color: #666666;
          }
        }
      }
    }
    .item-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: auto;
      height: 60px;
      color: #9B9B9B;
      padding-left: 15px;
      padding-right: 20px;
      .text {
        width: calc(~"100% - 15px");
        display: flex;
        align-items: center;
      }
      .unfold {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        pointer-events: none;
      }
      .name {
        overflow: hidden;
        font-size: 18px;
        color: #2E2E2E;
        pointer-events: none;
        text-overflow:ellipsis;
        white-space:nowrap
      }
      .icon.options {
        width: 15px;
        height: 15px;
        color: #59ADDA;
        // pointer-events: none;
      }
    }
  }
</style>
