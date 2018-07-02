<template>
  <div class="notice-puge-box">
    <div class="item" :style="{top: '0'}">{{copyValue}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  watch: {
    text (newValue) {
      const para = document.createElement("div")
      para.classList.add('item')
      para.style.top = '100%'
      para.innerHTML = newValue
      this.$el.appendChild(para)
      setTimeout(() => {
        this.$el.children[0].style.top = '-100px'
        this.$el.children[1].style.top = '0'
        setTimeout(() => {
          this.$el.removeChild(this.$el.children[0])
        }, 1000)
      }, 0)
    }
  },
  data () {
    return {
      copyValue: this.text
    }
  }
}
</script>

<style>
  .notice-puge-box {
    height: 89px;
    margin: 0 40px;
    margin-top: 20px;
    line-height: 90px;
    color: #6c6c6c;
    overflow: hidden;
    font-size: 1.4rem;
    position: relative;
    width: calc(100% - 380px);
    border-bottom: 1px solid #dddddd;
  }
  .notice-puge-box .item {
    width: 100%;
    position: absolute;
    transition: all 1s;
  }
</style>
