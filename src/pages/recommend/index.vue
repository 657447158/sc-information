<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <page-banner channelCode="ztlytj" :title="$t('recommand.pageTit')" />
    <div class="swipper-box">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img :src="slide" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";

export default {
  data() {
    return {
      // adList: [{pics:["http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"]},{pics:["http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"]},{pics:["http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"]},{pics:["http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"]},{pics:["http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"]}],
      // adOptions: {
      //   loop: true,
      //   autoplay: {
      //     delay: 2000,
      //     stopOnLastSlide: false,
      //     disableOnInteraction: true
      //   },
      //   pagination: {
      //     el: ".swiper-pagination"
      //   }
      // }
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 40,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg",
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg",
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg",
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg",
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg",
        "http://localhost:8081/img/index-journey-pic4.4815c9b4.jpg"
      ]
    };
  },
  components: {
    Header,
    Footer,
    PageBanner,
    // Loading,
    // ScrollLoad,
    swiper,
    swiperSlide
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.swipper-box {
  width: 100%;
  padding-left: 120px;
  margin-top: 140px;
  // padding-bottom: 180px;
  // height: 520px;
  // display: flex;
  // background: red;
  /deep/ .swiper-container {
    padding-bottom: 180px;
  }
  /deep/ .swiper-slide {
    height: 520px;
    width: 380px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .swiper-pagination {
    position: absolute;
    bottom: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    .swiper-pagination-bullet {
      margin-right: 10px;
      margin-left: 10px;
      width: 8px;
      height: 8px;
      background: #d1d1d1;
      border-radius: 4px;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      height: 16px;
      width: 16px;
      border-radius: 8px;
      background: $themeColor;
      position: relative;
    }
    .swiper-pagination-bullet-active::before {
      content: "<";
      position: absolute;
      left: -13px;
      top: -2px;
      color: $themeColor;
      font-size: 16px;
      transform: scale(50%);
    }
    .swiper-pagination-bullet-active::after {
      content: ">";
      position: absolute;
      top: -2px;
      right: -13px;
      color: $themeColor;
      font-size: 16px;
      transform: scale(50%);
    }
  }
}
</style>
