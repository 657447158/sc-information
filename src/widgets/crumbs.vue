<template>
  <div class="daq-crumbs" :class="scrollFlag && 'active'">
    <div class="main">
      <span class="icon"></span>
      <a href="index.html">首页</a>
      <span class="symbol" v-if="lv2.name"></span>
      <a :href="lv2.href" v-if="lv2.name">{{lv2.name}}</a>
      <span class="symbol" v-if="lv3.name"></span>
      <a :href="lv3.href" v-if="lv3.name">{{lv3.name}}</a>
      <span class="symbol" v-if="lv4"></span>
      <span v-if="lv3">{{lv4}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lv2: {
      type: Object,
      default: function () {
        return {}
      }
    },
    lv3: {
      type: Object,
      default: function () {
        return {}
      }
    },
    lv4: String
  },
  data () {
    return {
      scrollFlag: false,
      ticking: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll, false)
  },
  methods: {
    onScroll () {
      if(!this.ticking) {
        requestAnimationFrame(this.scrollHandle)
        this.ticking = true
      }
    },
    scrollHandle () {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 100) {
        this.scrollFlag = true
      } else {
        this.scrollFlag = false
      }
      this.ticking = false
    }
  }
}
</script>
<style lang="scss" scoped>
.daq-crumbs {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 98;
  padding-top: 17px;
  width: 100vw;
  height: 50px;
  font-size: 0;
  background: #f5f5f5;
  transition: all .3s linear;
}
.daq-crumbs.active {
  top: 60px;
}
.daq-crumbs span, .daq-crumbs a {
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #666;
}
.daq-crumbs .icon {
  width: 17px;
  height: 16px;
  background: url('../assets/images/daq-crumbs-home.png') no-repeat center;
}
.daq-crumbs .symbol {
  width: 4px;
  height: 8px;
  background: url('../assets/images/daq-crumbs-arrow.png') no-repeat center;
}
.daq-crumbs a:hover {
  text-decoration: underline;
}
</style>
