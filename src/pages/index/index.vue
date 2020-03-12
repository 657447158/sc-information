<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <!-- 悠闲好光景 -->
    <Time />
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner'
import Time from './modules/time'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    Time
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>
  /deep/ .sec-title {
    margin-bottom: 70px;
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
</style>
