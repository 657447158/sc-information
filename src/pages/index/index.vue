<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <Banner />
    <!-- 了解新鲜事 -->
    <Know />
    <!-- 悠闲好光景 -->
    <Scenery />
    <!-- 吃货藏宝图 -->
    <Food />
    <!-- 文艺慢生活、街巷故事汇 s -->
    <div class="index-sec">
      <a class="index-sec-box" href="news-list.html?channelCode=wymsh">
        <span class="index-sec-title">文艺慢生活</span>
        <span class="index-sec-slogan">生活的品质没有界限，对于文化，我们无限追求</span>
      </a>
      <a class="index-sec-box" href="news-list.html?channelCode=jxgsh">
        <span class="index-sec-title">街巷故事汇</span>
        <span class="index-sec-slogan">从都市的氛围到市井的街巷，是一种闲静舒适的生活方式</span>
      </a>
    </div>
    <!-- 文艺慢生活、街巷故事汇 e -->
    <!-- 规划行程 -->
    <Journey />
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Banner from './modules/banner'
import Know from './modules/know'
import Scenery from './modules/scenery'
import Food from './modules/food'
import Journey from './modules/journey'
export default {
  components: {
    Header,
    Footer,
    Banner,
    Know,
    Scenery,
    Food,
    Journey
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>
.index-sec {
  width: 100%;
  height: 560px;
  overflow: hidden;
  &-box {
    padding-top: 238px;
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    color: #fff;
    font-size: 18px;
    text-align: center;
    background: url('../../assets/images/index-sec-pic1.jpg') no-repeat;
    &:nth-child(2) {
      background: url('../../assets/images/index-sec-pic2.jpg') no-repeat;
    }
  }
  &-title {
    margin-bottom: 28px;
    display: block;
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
