<template>
  <div class="index-banner">
    <div class="main">
      <p class="p1">你可能感兴趣</p>
      <p class="p2 hide-ball" @click="toggle">点击选择你喜欢的页面</p>
      <!-- 下拉菜单 -->
      <div class="drop-down" :class="active && 'active'">
        <a href="scenery-list.html?code=destination">悠闲好光景</a>
        <a href="news-list.html?channelCode=wymsh">文艺慢生活</a>
        <a href="food-list.html?code=destination">吃货藏宝图</a>
        <a href="news-list.html?channelCode=jxgsh">街巷故事汇</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        active: false
      }
    },
    methods: {
      toggle () {
        this.active = !this.active
      }
    }
  }
</script>
<style lang="scss" scoped>
.index-banner {
  width: 100%;
  height: 800px;
  background: url('../../../assets/images/index-banner.jpg') fixed no-repeat center top;
  overflow: hidden;
}
.index-banner .main {
  margin: 400px auto 0;
}
.index-banner .p1 {
  font-size: 46px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.index-banner .p2 {
  position: relative;
  margin: 50px auto 0;
  width: 600px;
  height: 60px;
  font-size: 26px;
  color: #666;
  line-height: 60px;
  text-align: center;
  background: rgba(255, 255, 255, .9);
  cursor: pointer;
}
.index-banner .p2::before {
  content: '';
  display: block;
  position: absolute;
  top: -24px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 14px solid #fff;
  transform: translateX(-50%);
}
.index-banner .p2::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -24px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-top: 14px solid #fff;
  transform: translateX(-50%);
}
.index-banner .drop-down {
  padding-bottom: 24px;
  position: relative;
  z-index: 9;
  margin: 1px auto 0;
  width: 600px;
  background: rgba(255, 255, 255, .9);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all .3s linear;
  transform: rotateX(90deg);
  transform-origin: 50% 0;
}
.index-banner .drop-down a {
  margin-top: 24px;
  display: block;
  text-align: center;
  font-size: 22px;
  color: #666;
}
.index-banner .drop-down a:hover {
  color: $themeColor;
}
.index-banner .drop-down.active {
  opacity: 1;
  visibility: visible;
  transform: rotateX(0);
}
</style>
