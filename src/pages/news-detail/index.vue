<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv3="crumbsLv3"
    />
    <!-- 栏目banner -->
    <div class="detail-banner">
      <img v-if="path" :src="path" />
      <div class="main">
        <p class="title">{{detail.title}}</p>
        <p class="time">{{detail.publishtime | formateDate}}</p>
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
import banner1 from '@/assets/images/news-detail-banner1.jpg'
import banner2 from '@/assets/images/news-detail-banner2.jpg'
import banner3 from '@/assets/images/news-detail-banner3.jpg'
export default {
  components: {
    Header,
    Footer,
    Crumbs,
    Loading
  },
  data () {
    return {
      path: '',
      id: Tools.getUrlParams('id'),
      code: Tools.getUrlParams('code'),
      detail: {},
      loading: true,
      crumbsLv2: {},
      crumbsLv3: {}
    }
  },
  filters: {
    formateDate (val) {
      let str = val
      if (val) {
        str = val.split(' ')[0]
      }
      return str
    }
  },
  mounted () {
    if (this.code === 'next') {
      this.crumbsLv2 = {
        name: '下一站，出发',
        href: 'next.html?code=next'
      }
    }
    this.getBanner()
    this.getNewsDetail()
  },
  methods: {
    // 随机选择详情顶部banner
    getBanner () {
      // 获取一个1~3的随机整数
      const randomNum = Math.floor(Math.random() * 3 + 1)
      switch (randomNum) {
        case 1:
          this.path = banner1
          break
        case 2:
          this.path = banner2
          break
        case 3:
          this.path = banner3
          break
      }
    },
    getNewsDetail () {
      Ajax.getNewsDetail({
        id: this.id
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.detail = res.data
          this.crumbsLv3 = {
            name: res.data.channelName,
            href: `next-list.html?code=${this.code}&channelCode=${res.data.channelCode}`
          }
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
      bottom: 122px;
      left: 0;
      font-size: 36px;
      font-weight: bold;
    }
    .time {
      position: absolute;
      bottom: 60px;
      left: 0;
      font-size: 16px;
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
