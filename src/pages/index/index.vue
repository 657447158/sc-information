<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <!-- 悠闲好光景 -->
    <Time />
    <!-- 文艺慢生活 -->
    <Art />
    <!-- 吃货藏宝图 -->
    <Food />
    <!-- 街巷故事汇 -->
    <Story />
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner'
import Time from './modules/time'
import Art from './modules/art'
import Food from './modules/food'
import Story from './modules/story'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    Time,
    Art,
    Food,
    Story
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>
  /deep/ .sec-title {
    padding: 120px 0 70px;
    display: flex;
    align-items: flex-end;
    .title {
      font-size: 46px;
      color: #333;
      font-weight: bold;
    }
    .slogan {
      margin-left: 18px;
      font-size: 18px;
      color: #666;
    }
  }
  /deep/ .theme-box-more {
    display: block;
    width: 120px;
    font-size: 32px;
    text-align: center;
    background: rgba(255, 255, 255, .8);
    line-height: 36px;
    font-weight: bold;
    color: #d3a180;
    transition: all .3s linear;
    &:hover {
      background: #fff;
    }
  }
</style>
