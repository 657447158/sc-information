<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv4="crumbsLv4"
    />
    <!-- 栏目banner -->
    <div class="detail-banner">
      <img v-if="detail.channelImage" :src="detail.channelImage" />
      <div class="main">
        <p class="title">{{detail.name}}</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="detail-wrap">
      <div class="main" v-html="detail.content" v-if="detail.content"></div>
      <Loading :noData="!loading" />
    </div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import Tools from '@/utils/tools'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
import Loading from '@/widgets/loading'
export default {
  components: {
    Header,
    Footer,
    Crumbs,
    Loading
  },
  data () {
    return {
      channelCode: Tools.getUrlParams('channelCode'),
      code: Tools.getUrlParams('code'),
      detail: {},
      loading: true,
      crumbsLv2: {
        name: '',
        href: ''
      },
      crumbsLv4: ''
    }
  },
  mounted () {
    if (this.code === 'info') {
      this.crumbsLv2 = {
        name: '实用信息',
        href: 'info.html?code=info'
      }
    }
    this.getChannelDetail()
  },
  methods: {
    getChannelDetail () {
      Ajax.getChannelDetail({
        channelCode: this.channelCode
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.detail = res.data
          this.crumbsLv4 = res.data.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &-banner {
    margin-top: 170px;
    width: 100%;
    height: 460px;
    color: #fff;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .main {
      position: relative;
    }
    .title {
      position: absolute;
      bottom: 60px;
      left: 0;
      font-size: 36px;
      font-weight: bold;
    }
  }
  &-wrap {
    padding: 60px 0 100px;
    width: 100%;
    background: #f5f5f5;
    .main {
      padding: 60px 40px;
      background: #fff;
    }
    /deep/ img {
      max-width: 100%;
    }
  }
}
</style>
