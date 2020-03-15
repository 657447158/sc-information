<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <page-banner channelCode="syxx" :title="$t('service.pageTit')" />
    <div class="service-container main">
      <ul class="service-wrapper" slot="list">
        <li 
          class="light"
          v-for="item in list"
          :key="item.id"
        >
          <span class="daq-icon" v-html="item.metaDescription"></span>
          <div class="desc">{{item.name}}</div>
          <p class="detail">{{item.summary}}</p>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";
import Ajax from '@/service'
export default {
  components: {
    Header,
    Footer,
    PageBanner
  },
  mixins: [scrollAnimate],
  data () {
    return {
      list: []
    }
  },
  mounted () {
    Ajax.getChannelList({
      channelCode: 'syxx'
    }).then(res => {
      if (res.code === 0) {
        this.list = res.datas
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.service-container {
  margin: 100px auto;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .service-wrapper {
    width: 1360px;
    display: flex;
    flex-wrap: wrap;
    li {
      display: block;
      box-sizing: border-box;
      width: 452px;
      height: 300px;
      margin: 2px 0 0 2px;
      padding: 60px 40px 0 60px;
      background: #f5f5f5;
      .daq-icon {
        font-size: 52px;
        text-align: center;
        color: #333333;
      }
      .desc {
        margin-top: 30px;
        font-size: 24px;
        color: #333333;
      }
      .detail {
        margin-top: 20px;
        font-size: 16px;
        line-height: 21px;
        color: #666666;
      }
      &:nth-child(even) {
        background: #e7e7e7;
      }
      &:nth-child(3n+1) {
        margin-left: 0;
      }
    }
  }
}
</style>
