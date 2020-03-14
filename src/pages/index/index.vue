<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <!-- 搜索你所喜好 -->
    <Favorite />
    <!-- 悠闲好光景 -->
    <Time />
    <!-- 文艺慢生活 -->
    <Art />
    <!-- 吃货藏宝图 -->
    <Food />
    <!-- 街巷故事汇 -->
    <Story />
    <!-- 好耍夜生活 -->
    <Night />
    <div class="index-footer">
      <ul class="index-footer-link main">
        <li>
          <span class="daq-icon">&#xe666;</span>
          <span>Tourist VISA</span>
        </li>
        <li>
          <span class="daq-icon">&#xe66f;</span>
          <span>City traffic</span>
        </li>
        <li>
          <span class="daq-icon">&#xe66c;</span>
          <span>Hotel accomodation</span>
        </li>
        <li>
          <span class="daq-icon">&#xe675;</span>
          <span>Travel agency inquiry</span>
        </li>
        <li>
          <span class="daq-icon">&#xe672;</span>
          <span>Caring service</span>
        </li>
        <li>
          <span class="daq-icon">&#xe668;</span>
          <span>Health and life safety</span>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner'
import Favorite from './modules/favorite'
import Time from './modules/time'
import Art from './modules/art'
import Food from './modules/food'
import Story from './modules/story'
import Night from './modules/night'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    Favorite,
    Time,
    Art,
    Food,
    Story,
    Night
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
  /deep/ .theme-box-title {
    margin-bottom: 16px;
    font-size: 46px;
    font-weight: bold;
    color: rgba(255, 255, 255, 8);
  }
  /deep/ .theme-box-slogan {
    margin-bottom: 16px;
    font-size: 24px;
    color: #fff;
  }
  /deep/ .modal-box {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    padding: 30px;
    width: 100%;
    height: 100%;
    font-size: 18px;
    color: #fff;
    transition: all .3s linear;
    background: url('../../assets/images/modal-h540.png') repeat-x;
  }
  .index-footer {
    width: 100%;
    height: 250px;
    background: #dfdfdf;
  }
  .index-footer-link {
    padding: 90px 0 0 70px;
    display: flex;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 18px;
      color: #333;
      &:nth-child(2) { margin-left: 100px; }
      &:nth-child(3) { margin-left: 80px; }
      &:nth-child(4) { margin-left: 46px; }
      &:nth-child(5) { margin-left: 60px; }
      &:nth-child(6) { margin-left: 60px; }
    }
    .daq-icon {
      margin-bottom: 26px;
      width: 120px;
      height: 120px;
      color: #333;
      font-size: 50px;
      text-align: center;
      line-height: 120px;
      border: 1px solid #999;
    }
  }
</style>
