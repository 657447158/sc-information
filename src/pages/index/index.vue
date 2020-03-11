<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <P>{{$t('index-page-title')}}</P>
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
export default {
  components: {
    Header,
    Footer
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>

</style>
