<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- <P>{{$t('index-page-title')}}</P> -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <div class="list-container">
      <scroll-load>
        <ul class="list-wrapper" slot="list">
          <li>
            <a href>
              <span class="img-box">
                <img src="@/assets/images/index-journey-pic4.jpg" alt />
              </span>

              <h3>Chengdu Panda Base</h3>
              <p>
                The giant panda breeding research institute fully simulates the wild living environment of
                giant pandas.and raises more than 100 giant pandas.
              </p>
            </a>
          </li>
          <li>
            <span class="img-box">
              <img src="@/assets/images/index-journey-pic4.jpg" alt />
            </span>
            <h3>Chengdu Panda Base</h3>
            <p>
              The giant panda breeding research institute fully simulates the wild living environment of
              giant pandas.and raises more than 100 giant pandas.
            </p>
          </li>
        </ul>
      </scroll-load>
    </div>
    <Loading />
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";
// import Loading from "@/widgets/loading";
import ScrollLoad from '@/components/scrollLoad'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    // Loading,
    ScrollLoad
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  min-width: 1360px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .list-wrapper {
    width: 1360px;

    display: flex;
    flex-wrap: wrap;
    li {
      width: 660px;
      margin-top: 60px;
      .img-box {
        display: block;
        width:660px;
        height:432px;
        // background: red;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img-box:hover img {
          transform: scale(1.1);
        }

      h3 {
        line-height: 72px;
        font-size: 24px;
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #666666;
      }
    }
    li:nth-child(2n) {
      margin-left: 40px;
    }
  }
}
</style>
