<template lang="pug">
  //- 左侧二级菜单栏
  .left-menu-bar
    //编辑菜单
    MenuEdit(ref="edit", v-show="showEditFlag", @hideEdit="showEditFlag = false")
    // 一级
    .item-box(v-for="(menuLv1, key1, index1) in menuData")
      .item-wrap.lv1
        .text(@click="unfold(menuLv1)")
          .icon.unfold(v-if="menuLv1.isunfold") &#xe656;
          .icon.unfold(v-else) &#xe643; 
          p.name {{menuLv1.group_name}}
        .icon.options(@click="showEdit") &#xe7a8;
      // 二级
      .menu-lv2-box(v-show="menuLv1.isunfold")
        .menu-lv2(v-for="(menuLv2, key2, index2) in menuLv1.son", v-if="menuLv2")
          .item-wrap.lv2
            .text(@click="unfold(menuLv2)")
              .icon.unfold(v-if="menuLv2.isunfold") &#xe656;
              .icon.unfold(v-else) &#xe643;
              p.name {{menuLv2.group_name}}
            .icon.options(@click="showEdit") &#xe7a8;
          // 三级
          .menu-lv3-box(v-show="menuLv2.isunfold")
            .menu-lv3(v-for="(menuLv3, key3, index3) in menuLv2.son", v-if="menuLv3")
              .item-wrap.lv3
                .text(@click="getLv3Detail", :class="{active:menuLv3.isSelect}")
                  // .icon.unfold &#xe643;
                  p.name {{menuLv3.group_name}}
                .icon.options(@click="showEdit(menuLv3)") &#xe7a8;
</template>

<script>
import { Fun, Config } from '@/Order.js'
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
    
  },
  components: {
    MenuEdit
  },
  methods: {
    getGroup () {
      let _this = this
      Fun.post(`${Config.serve}/query_group_list`, {}, (result) => {
        if (result.err === 0) {
          let data = result.data
          for (let key in data) {
            let item1 = data[key]
            item1['isunfold'] = false
            for (let key2 in item1.son) {
              let item2 = item1.son[key2]
              item2['isunfold'] = false
              for (let key3 in item2.son) {
                let item3 = item2.son[key3]
                item3.isSelect = false
              }
            }
          }
          _this.menuData = data
        }
      })
    },
    // 展开和隐藏
    unfold (menu) {
      menu['isunfold'] = !menu['isunfold']
    },
    showEdit ($event) {
      this.showEditFlag = true
      let edit = this.$refs.edit.$el
      let pos = {
        left: $event.target.offsetLeft - 150,
        top: $event.target.offsetTop + 10
      }
      edit.style.left = pos.left + 'px'
      edit.style.top = pos.top + 'px'
    },
    getLv3Detail (prams) {
      let data = this.menuData
      for (let key in data) {
        let item1 = data[key]
        for (let key2 in item1.son) {
          let item2 = item1.son[key2]
          for (let key3 in item2.son) {
            let item3 = item2.son[key3]
            if (item3.group_id === prams.group_id) {
              item3.isSelect = true
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
    background-color: white;
    width: 200px;
    overflow: hidden;
    box-shadow: 7px 0px 10px #edf3ff;
    .item-box {
      width: 100%;
      height: auto;
      overflow: hidden;
      align-items: center;
      user-select: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease-out;
      letter-spacing: 0;
      // 二级分组
      .menu-lv2 {
        height: auto;
        overflow: hidden;
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
            box-shadow: 0 5px 10px 0 rgba(34,63,253,0.30);
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
