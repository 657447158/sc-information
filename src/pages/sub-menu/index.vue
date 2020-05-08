<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="article-container main">
      <Loading :noData="!loading" />
      <!-- 左侧菜单 -->
      <ul class="menu">
        <li
          v-for="(item, index) in menus"
          :key="item.id"
          :class="menuIndex === index && 'active'"
          @click="changTab(index)"
        >{{item.title}}</li>
      </ul>
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
      channelCode: tools.getUrlParams("code"),
      menus: [],
      menuIndex: 0,
      detail: {}
    }
  },
  mounted () {
    this.getNewsList()
  },
  methods: {
    changTab (index) {
      if (this.menuIndex === index) return
      this.menuIndex = index
      this.detail = this.menus[index]
    },
    getNewsList () {
      this.loading = true
      Ajax.getNewsList({
        channelCode: this.channelCode
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.menus = res.datas
          this.detail = res.datas[0]
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #f5f5f5;
}
.article-container {
  position: relative;
  padding: 140px 0 100px;
  .menu {
    position: sticky;
    top: 100px;
    padding: 24px 0 100px;
    width: 340px;
    background: #fff;
    li {
      padding: 0 30px;
      line-height: 66px;
      font-size: 24px;
      color: #333;
      cursor: pointer;
      &.active {
        color: $themeColor;
        font-weight: bold;
      }
    }
  }
  .article {
    position: absolute;
    top: 140px;
    right: 0;
    padding: 70px 40px;
    width: 1000px;
    background: #fff;
    &-title {
      margin-bottom: 80px;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    /deep/ img{
      max-width: 100%;
    }
  }
}
</style>
