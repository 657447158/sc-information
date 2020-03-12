<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner.vue'
export default {
  components: {
    Header,
    Footer,
    PageBanner
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>

</style>
