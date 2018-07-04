<template lang="pug">
  //- 左侧二级菜单栏
  .left-bar
    .logo
    .item-list(v-for="item in menuData", :key="item.name", :style="getItemHeight(item)", :class="{'open' : item.showmenu}")
      .item-wrap(@click="item.showmenu = !item.showmenu")
        <svg t="1530503401504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4237" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M987.392 988.224H36.544c-20.096 0-36.544-14.336-36.544-32.128v-191.872c0-17.6 16.384-32 36.544-32h950.784c20.224 0 36.608 14.272 36.608 32v191.872c0.064 17.792-16.32 32.128-36.544 32.128zM146.304 785.6H60.992v74.624h85.312v-74.624z m499.84 0H560.832v149.248h85.312v-149.248z m158.336 0h-85.248v149.248h85.248v-149.248z m158.528 0h-85.312v149.248h85.312v-149.248zM987.392 654.656H36.544c-20.096 0-36.544-14.4-36.544-32.128V430.592c0-17.6 16.384-32 36.544-32h950.784c20.224 0 36.608 14.336 36.608 32v191.936c0.064 17.728-16.32 32.128-36.544 32.128zM146.304 451.904H60.992v74.688h85.312V451.904z m499.84 0H560.832v149.312h85.312V451.904z m158.336 0h-85.248v149.312h85.248V451.904z m158.528 0h-85.312v149.312h85.312V451.904zM987.392 320H36.544C16.448 320 0 305.664 0 287.936V96c0-17.6 16.384-32 36.544-32h950.784c20.288 0 36.672 14.336 36.672 32v191.936c0 17.728-16.384 32.064-36.608 32.064zM146.304 117.312H60.992V192h85.312V117.312z m499.84 0H560.832v149.312h85.312V117.312z m158.336 0h-85.248v149.312h85.248V117.312z m158.528 0h-85.312v149.312h85.312V117.312z" fill="" p-id="4238"></path></svg>
        p.name {{item.name}}
      .children(v-if="item.children && item.children.length > 0")
        <svg class="drop-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 10"><polygon points="0 5 5 10 5 0 0 5"/></svg>
        router-link.child(v-for="(child, index) in item.children", :to="child.to", tag="div", :key="child.name")
          .name {{child.name}}
</template>

<script>
export default {
  props: {
    menuData: Array
  },
  mounted () {
    for (let index in this.menuData) {
      let item = this.menuData[index]
      if (!item.children) continue
      let children = item.children
      let _this = this
      children.forEach(child => {
        let pathActive = _this.checkPath(child.to)
        if (pathActive) {
          item.showmenu = true
          this.getItemHeight(item)
        }
      })
    }
  },
  methods: {
    // 根据子菜单数量计算出菜单高度
    getItemHeight (menuItem) {
      if (menuItem.showmenu) {
        return { height: (menuItem.children.length + 1) * 60 + 'px' }
      } else {
        return { height: '60px' }
      }
    },
    checkPath (to) {
      let path = this.$route.path
      let reg = new RegExp(`${to}`, 'g')
      return reg.test(path)
    }
  }
}
</script>

<style lang="less" scoped>
  .left-bar {
    transition: width 0.5s;
    background-color: white;
    width: 200px;
    position: relative;
    overflow: hidden;
    box-shadow: 1px 0px 1px #ccc;
    .open .drop-down {
      transform: rotate(-90deg);
    }
    .item-list {
      width: 100%;
      height: 60px;
      font-size: 1.1em;
      overflow: hidden;
      color: #666;
      line-height: 60px;
      align-items: center;
      user-select: none;
      cursor: pointer;
      position: relative;
      text-decoration: none;
      transition: ALL 0.2s ease-out;
      letter-spacing: 4px;
      .router-link-active {
        border-left: 5px solid #59ADDA;
        background: rgba(235,235,235,0.50);
        .icon {
          color:#59ADDA;
        }
      }
      .children {
        height: auto;
        overflow: hidden;
        background-color: #f5f9ff;
      }
      .child {
        transition: all .3s;
        display: flex;
        align-items: center;
        width: 150px;
        height: 60px;
        padding-left: 50px;
        &:hover {
          background: rgba(89, 173, 218, 0.07);
          border-left: 5px solid #59ADDA;
          width: 145px;
          .name {
            color: #59ADDA;
          }
        }
        .icon {
          width: 30px;
          text-align: center;
          color: #686868;
          pointer-events: none;
        }
        .name {
          color: #686868;
          height: 60px;
          line-height: 60px;
          pointer-events: none;
        }
      }
    }
  }
  .item-wrap {
    display: flex;
    align-items: center;
    width: auto;
    height: 60px;
    font-size: 1.1em;
    position: relative;
    border-left: 5px solid transparent;
    .icon {
      width: 60px;
      height: 20px;
      fill: #686868;
      pointer-events: none;
    }
    .name {
      overflow: hidden;
      color: #686868;
      pointer-events: none;
    }
  }
  .logo {
    margin: 0 20px;
    padding: 20px 0;
    height: 50px;
    border-bottom: 1px solid #dddddd;
  }
  .drop-down {
    position: absolute;
    width: 6px;
    right: 25px;
    top: 24px;
    fill: #686868;
    transition: all 0.5s;
  }
  @media screen and (max-width: 1920px) {
    .left-bar {
      width: 160px;
    }
    .item-wrap {
      .icon {
        width: 40px;
      }
      .name {
        letter-spacing: normal;
      }
    }
  }
</style>
