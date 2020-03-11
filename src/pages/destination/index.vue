<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 二级页面banner -->
    <page-banner title="目的地" />
    <!-- 四川地图 -->
    <Map />
    <!-- 目的地列表 -->
    <List />
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner'
import Map from './modules/map'
import List from './modules/list'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    Map,
    List
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>
.page-banner {
  background: url('../../assets/images/des-banner.jpg') no-repeat top center fixed;
}
</style>
