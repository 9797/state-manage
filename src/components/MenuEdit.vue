<template lang="pug">
  .edit-wrap
    .mark(@click="hideEdit")
    .edit-box#edit(v-if="editMenuData.ops")
      .option(@click="addGroup", v-if="editMenuData.ops.includes(0)") 新建分组
      .option(@click="addSubGroup", v-if="editMenuData.ops.includes(1)") 添加下级分组
      .option(@click="renameGroup", v-if="editMenuData.ops.includes(2)") 重命名该组
      .option(@click="deleteGroup", v-if="editMenuData.ops.includes(3)") 删除分组
      .option(@click="editGroup", v-if="editMenuData.ops.includes(4)") 编辑
    .tip-box
</template>
<script>
import { Fun, Config, Order } from '@/Order.js'
export default {
  props: ['editMenuData'],
  methods: {
    // 隐藏编辑组件
    hideEdit () {
      this.$emit('hideEdit')
    },
    // 新增
    addGroup () {
      this.hideEdit()
      let data = {
        type: 'add',
        title: '添加分组'
      }
      this.showTip(data)
    },
    // 重命名
    renameGroup () {
      this.hideEdit()
      let editObj = Fun.deepClone(this.editMenuData)
      delete editObj.son
      let data = Object.assign({
        type: 'edit',
        title: '修改分组名称'
      }, editObj)
      this.showTip(data)
    },
    // 新建下级分组
    addSubGroup () {
      this.hideEdit()
      let editObj = Fun.deepClone(this.editMenuData)
      delete editObj.son
      let data = Object.assign({
        type: 'addSub',
        title: '添加下级分组'
      }, editObj)
      this.showTip(data)
    },
    // 删除分组
    deleteGroup () {
      this.hideEdit()
      let editObj = Fun.deepClone(this.editMenuData)
      delete editObj.son
      let data = Object.assign({
        type: 'del',
        title: '删除分组'
      }, editObj)
      this.showTip(data)
    },
    // 编辑
    editGroup () {
      this.hideEdit()
      this.$router.push(`/edit/${this.editMenuData.group_id}`)
      // 传递菜单分级到edit页面
      Order.$emit('GroupLevel', this.editMenuData)
    },
    // 显示提示框
    showTip (data) {
      Order.$emit('showTip', data)
    }
  }
}
</script>
<style lang="less" scoped>
  .edit-wrap {
    position: absolute;
  }
  .edit-box {
    position: relative;
    z-index: 10;
    width: 126px;
    height: auto;
    padding: 40px 30px 30px;
    background: url(./../assets/edit-box.png) no-repeat;
    background-size: 100% 100%;
    .option {
      z-index: 100;
      font-size: 14px;
      color: #686868;
      line-height: 20px;
      cursor: pointer;
      &:hover{
        color: #59ADDA;
      }
    }
  }
  .mark {
    z-index: 9;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: transparent;
  }
</style>

