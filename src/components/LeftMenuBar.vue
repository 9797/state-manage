<template lang="pug">
  //- 左侧二级菜单栏
  .left-menu-bar
    //- 编辑菜单
    MenuEdit(ref="edit", v-show="showEditFlag", @hideEdit="showEditFlag = false", :editMenuData="editMenuData")
    //- 当没有分组时显示新增分组的按钮
    .add-group-btn(v-if="menuData && menuData.length === 0", @click="addFirstGroup")
      .text 新建分组
      .icon.add &#xe621;
    //- 一级
    .item-box(v-for="(menuLv1, key1, index1) in menuData", v-if="menuLv1")
      .item-wrap.lv1(@click="unfold(menuLv1)", :title="menuLv1.group_name")
        .text
          .icon.unfold(v-if="menuLv1.isunfold") &#xe656;
          .icon.unfold(v-else) &#xe643; 
          p.name {{menuLv1.group_name}}
        .icon.options(@click.stop.self="showEdit($event, menuLv1, 1)") &#xe612;
      //- 二级
      .menu-lv2-box(v-show="menuLv1.isunfold")
        .menu-lv2(v-for="(menuLv2, key2, index2) in menuLv1.son", v-if="menuLv2")
          .item-wrap.lv2(@click="unfold(menuLv2)", :title="menuLv2.group_name")
            .text
              .icon.unfold(v-if="menuLv2.isunfold") &#xe656;
              .icon.unfold(v-else) &#xe643;
              p.name {{menuLv2.group_name}}
            .icon.options(@click.stop.self="showEdit($event, menuLv2, 2)") &#xe612;
          //- 三级
          .menu-lv3-box(v-show="menuLv2.isunfold")
            router-link.menu-lv3(v-for="(menuLv3, key3, index3) in menuLv2.son", v-if="menuLv3", :to="'/state/' + menuLv3.group_id", tag="div", :key="menuLv3.group_id")
              .item-wrap.lv3
                .text(:title="menuLv2.group_name")
                  p.name(:title="menuLv3.group_name") {{menuLv3.group_name}}
                .icon.options(@click.stop.self="showEdit($event, mergObj(menuLv3, menuLv1.group_name, menuLv2.group_name), 3)") &#xe612;
</template>

<script>
import { Fun, Config, Order } from '@/Order.js'
import MenuEdit from '@/components/MenuEdit'
export default {
  data () {
    return {
      // 分组的数据
      menuData: [],
      showEditFlag: false,
      editMenuData: {}
    }
  },
  created () {
    // 获取分组列表
    this.getGroup()
  },
  mounted () {
    let _this = this
    Order.$on('updataMenu', (data) => {
      console.log(data)
      if (data.type === 'add')
      _this.addMenu(data)
      if (data.type === 'edit')
      _this.editMenu(data)
      if (data.type === 'addSub')
      _this.addSubMenu(data)
      if (data.type === 'del')
      _this.delMenu(data)
    })
  },
  beforeDestroy () {
    Order.$off('updataMenu')
  },
  components: {
    MenuEdit
  },
  methods: {
    // 新增第一个分组
    addFirstGroup () {
     let data = {
        type: 'add',
        title: '添加分组'
      }
      Order.$emit('showTip', data)
    },
    // 对象合并
    mergObj () {
      return Object.assign(arguments[0], {
        lv1: arguments[1],
        lv2: arguments[2],
        lv3: arguments[0].group_name
      })
    },
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
              }
            }
          }
          _this.menuData = data
        }
      })
    },
    // 新增菜单
    addMenu (data) {
      let _this = this
      Fun.post(`${Config.serve}group/insert_group`, {
        group_name: data.value
      }, (result) => {
        if (result.err === 0) {
          _this.getGroup()
        }
      })
    },
    // 修改菜单
    editMenu (data) {
      let _this = this
      Fun.post(`${Config.serve}group/update_group`, {
        group_id: data.group_id,
        data : {
          group_name: data.value
        }
      }, (result) => {
        if (result.err === 0) {
          _this.getGroup()
        }
      })
    },
    // 新增下级分组
    addSubMenu (data) {
      let _this = this
      Fun.post(`${Config.serve}group/insert_child_group`, {
        group_name: data.value,
        parent_id: data.group_id
      }, (result) => {
        if (result.err === 0) {
          _this.getGroup()
        }
      })
    },
    // 删除
    delMenu (data) {
      let _this = this
      Fun.post(`${Config.serve}group/delete_group`, {
        group_id: data.group_id
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
    showEdit (e, o, l) {
      this.showEditFlag = true
      // 0 :  新建分组
      // 1 :  添加下级分组
      // 2 :  重命名该组
      // 3 :  删除分组
      // 4 :  编辑
      if (l && l === 1)
      o.ops = [0, 1, 2, 3]
      if (l && l === 2)
      o.ops = [2, 3, 5]
      if (l && l === 3)
      o.ops = [2, 3, 4]
      this.editMenuData = o
      let editBox = this.$refs.edit.$el
      if (!editBox) return
      let pos = {
        left: e.target.offsetLeft - 166,
        top: e.target.offsetTop + 10
      }
      editBox.style.left = pos.left + 'px'
      editBox.style.top = pos.top + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
  .left-menu-bar {
    width: 200px;
    height: 100%;
    overflow: auto;
    transition: all 0.5s;
    position: relative;
    box-shadow: 1px 0px 1px #cccccc;
    background: #ffffff;
    .add-group-btn {
      cursor: pointer;
      width: auto;
      height: 60px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      margin-left: 15px;
      margin-right: 20px;
      .text {
        width: calc(~"100% - 15px");
        font-size: 18px;
        color: #2E2E2E;
        line-height: 60px;
        padding-left: 25px;
      }
      .icon.add {
        width: 15px;
        height: 15px;
        line-height: 15px;
        background: #fff;
        color: #59ADDA;
        text-align: center;
        font-size: 15px;
      }
    }
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
        &.router-link-active, &:hover {
          .item-wrap {
            padding-left: 60px;
            border-left: 5px solid #0CAAFF;
            background: #F5F5F5;
          }
        }
        .item-wrap {
          transition: all .3s;
          padding-left: 65px;
          border-left: 0;
          .text {
            pointer-events: none;
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
      &:hover .icon.options{
        color: #59ADDA;
      }
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
        color: #666666;
        // pointer-events: none;
      }
    }
  }
</style>
