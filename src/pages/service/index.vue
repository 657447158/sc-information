<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- <P>{{$t('index-page-title')}}</P> -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <div class="service-container">
      <ul class="service-wrapper" slot="list">
        <li class="light">
          <span class="daq-icon">&#xe666;</span>
          <div class="desc">Tourist VISA</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
        </li>
        <li class="dark">
          <span class="daq-icon">&#xe66f;</span>
          <div class="desc">City traffic</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
        </li>
        <li class="light">
          <span class="daq-icon">&#xe66c;</span>
          <div class="desc">Hotel accomodation</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
        </li>
        <li class="dark">
          <span class="daq-icon">&#xe675;</span>
          <div class="desc">Travel agency inquiry</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
        </li>
        <li class="light">
          <span class="daq-icon">&#xe672;</span>
          <div class="desc">Caring service</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
        </li>
        <li class="dark">
          <span class="daq-icon">&#xe668;</span>
          <div class="desc">Health and life safety</div>
          <p class="detail">
            Seda, a pure paradise of wonderful prairie,
            where you can forget all your worries.
          </p>
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
export default {
  components: {
    Header,
    Footer,
    PageBanner
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.service-container {
  width: 100%;
  min-width: 1360px;
  margin-bottom: 100px;
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
      margin-top: 2px;
      margin-left: 2px;
      padding-top: 60px;
      padding-left: 60px;
      padding-right: 40px;
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
      &.light {
        background: #f5f5f5;
      }
      &.dark {
        background: #e7e7e7;
      }
    }
     li:nth-child(3n+1) {
            margin-left: 0;
          }
  }
}
</style>
