<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="article-container main">
      <Loading :noData="!loading" />
      <div 
        class="article"
        v-if="Object.keys(detail).length"
      >
        <p class="article-title">{{detail.title}}</p>
        <div v-html="detail.content"></div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import Loading from '@/widgets/loading'
import tools from '@/utils/tools.js'
export default {
  components: {
    Header,
    Footer,
    Loading
  },
  mixins: [scrollAnimate],
  data () {
    return {
      loading: false,
      detail: {}
    }
  },
  mounted () {
    this.loading = true
    Ajax.getNewsDetail({
      id: tools.getUrlParams('id')
    }).then(res => {
      this.loading = false
      if (res.code === 0) {
        this.detail = res.data
      }
    }).catch(err => {
      this.loading = false
      console.error(err)
    })
  }
};
</script>

<style lang="scss" scoped>
.article-container {
  padding: 140px 0 100px;
  .article {
    padding: 70px 40px;
    width: 100%;
    background: #f5f5f5;
    &-title {
      margin-bottom: 80px;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    img{
      max-width: 100%;
    }
  }
}
</style>
