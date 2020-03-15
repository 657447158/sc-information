<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <page-banner channelCode="ztlytj" :title="$t('recommand.pageTit')" />
    <div class="swipper-box">
      <swiper :options="swiperOption" v-if="themeTravelList.length">
        <swiper-slide v-for="(slide, index) in themeTravelList" :key="index">
          <a :href="`channel-detail.html?code=${slide.channelCode}`">
            <img :src="slide.navImage" v-if="slide.navImage" />
            <p>{{slide.name}}</p>
          </a>
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
import Ajax from '@/service'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 40,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      themeTravelList: []
    }
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
  mixins: [scrollAnimate],
  mounted () {
    if (!sessionStorage.getItem('themeTravelList')) {
      this.getChannelCodeByThemeTravel()
    } else {
      this.themeTravelList = JSON.parse(sessionStorage.getItem('themeTravelList'))
      console.log(this.themeTravelList)
    }
  },
  methods: {
    // 获取主题旅游栏目下的子栏目
    getChannelCodeByThemeTravel () {
      Ajax.getChannelList({
        channelCode: 'ztlytj'
      }).then(res => {
        if (res.code === 0) {
          this.themeTravelList = res.datas
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.swipper-box {
  width: 100%;
  margin-top: 140px;
  /deep/ .swiper-container {
    padding-bottom: 180px;
    padding-left: 120px;
    padding-right: 120px;;
  }
  /deep/ .swiper-slide {
    height: 520px;
    width: 380px;
    overflow: hidden;
    position: relative;
    a {
      display: block;
    }
    p{
      position: absolute;
      width: 100%;
      bottom: 60px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
    }
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s linear;
    }
    &:hover img {
      transform: scale(1.1);
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
      content: "";
      position: absolute;
      top: 4px;
      left: -10px;
      width: 4px;
      height: 8px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0NkQxNzAzNUUwRjExRUFCMDRFRTM4NTc5NTM1ODlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0NkQxNzA0NUUwRjExRUFCMDRFRTM4NTc5NTM1ODlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ2RDE3MDE1RTBGMTFFQUIwNEVFMzg1Nzk1MzU4OUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ2RDE3MDI1RTBGMTFFQUIwNEVFMzg1Nzk1MzU4OUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5etcPvAAAAYElEQVR42mL8//8/AwhcWdQoC6SWsUA5okBqPRBnMIcoMXIDGZuBuF4nrv4wE5CxDoinAzm7QKpBAsxA/JcBCkACwUBcBDTHHSTACLIFyBEDsvcAcRojkrXKQGoFQIABABBoH2HWHOz7AAAAAElFTkSuQmCC") no-repeat;
    }
    .swiper-pagination-bullet-active::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 8px;
      top: 4px;
      right: -10px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0NkQxNzAzNUUwRjExRUFCMDRFRTM4NTc5NTM1ODlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0NkQxNzA0NUUwRjExRUFCMDRFRTM4NTc5NTM1ODlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ2RDE3MDE1RTBGMTFFQUIwNEVFMzg1Nzk1MzU4OUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ2RDE3MDI1RTBGMTFFQUIwNEVFMzg1Nzk1MzU4OUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5etcPvAAAAYElEQVR42mL8//8/AwhcWdQoC6SWsUA5okBqPRBnMIcoMXIDGZuBuF4nrv4wE5CxDoinAzm7QKpBAsxA/JcBCkACwUBcBDTHHSTACLIFyBEDsvcAcRojkrXKQGoFQIABABBoH2HWHOz7AAAAAElFTkSuQmCC") no-repeat;
      transform: rotate(180deg);
    }
  }
}
</style>
