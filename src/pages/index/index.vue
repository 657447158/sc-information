<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 顶部banner -->
    <div class="index-video">
      <swiper :options="swiperOption">
        <swiper-slide>
          <video ref="video1" src="@/assets/videos/video.mp4" autoplay loop muted></video>
        </swiper-slide>
        <swiper-slide>
          <video ref="video2" src="@/assets/videos/video2.mp4" loop muted></video>
        </swiper-slide>
        <swiper-slide>
          <video ref="video3" src="@/assets/videos/video3.mp4" loop muted></video>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="swiper-pagination"></div>
      <p class="word">{{$t('index.pageTit')}}</p>
    </div>
    <!-- 搜索你所喜好 -->
    <Favorite />
    <!-- 悠闲好光景 -->
    <Time />
    <!-- 文艺慢生活 -->
    <Art />
    <!-- 吃货藏宝图 -->
    <Food />
    <!-- 街巷故事汇 -->
    <Story />
    <!-- 好耍夜生活 -->
    <Night />
    <div class="index-footer">
      <ul class="index-footer-link main">
        <li
          v-for="item in informationList"
          :key="item.id"
        >
          <a :href="`list-menu.html?code=${item.channelCode}`" v-if="item.channelCode === 'zs' || item.channelCode ==='jkhrsaq'">
            <span class="daq-icon" v-html="item.metaDescription"></span>
            <span>{{item.name}}</span>
          </a>
          <a :href="`travel-agency.html?code=${item.channelCode}`" v-else-if="item.channelCode === 'lxs'">
            <span class="daq-icon" v-html="item.metaDescription"></span>
            <span>{{item.name}}</span>
          </a>
          <a :href="`channel-detail.html?code=${item.channelCode}`" v-else>
            <span class="daq-icon" v-html="item.metaDescription"></span>
            <span>{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Ajax from '@/service'
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Favorite from './modules/favorite'
import Time from './modules/time'
import Art from './modules/art'
import Food from './modules/food'
import Story from './modules/story'
import Night from './modules/night'
import "swiper/dist/css/swiper.css";
export default {
  components: {
    swiper,
    swiperSlide,
    Header,
    Footer,
    Favorite,
    Time,
    Art,
    Food,
    Story,
    Night
  },
  mixins: [scrollAnimate],
  data () {
    let _this = this
    return {
      informationList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function(){
            _this.stopVideo()
            _this.$refs[`video${this.activeIndex + 1}`].currentTime = 0
            _this.$refs[`video${this.activeIndex + 1}`].play()
          },
        },
      }
    }
  },
  mounted () {
    if (!sessionStorage.getItem('informationList')) {
      this.getChannelCodeByInformation()
    } else {
      this.informationList = JSON.parse(sessionStorage.getItem('informationList'))
    }
  },
  methods: {
    // 获取实用信息下的子栏目
    getChannelCodeByInformation () {
      Ajax.getChannelList({
        channelCode: 'syxx'
      }).then(res => {
        if (res.code === 0) {
          this.informationList = res.datas
        }
      })
    },
    // 停止所有视频
    stopVideo () {
      this.$refs.video1.pause()
      this.$refs.video2.pause()
      this.$refs.video3.pause()
    }
  },
}
</script>

<style lang="scss" scoped>
  /deep/ .sec-title {
    padding: 120px 0 70px;
    display: flex;
    align-items: flex-end;
    .title {
      font-size: 46px;
      color: #333;
      font-weight: bold;
    }
    .slogan {
      margin: 0 0 6px 18px;
      font-size: 18px;
      color: #666;
    }
  }
  /deep/ .theme-box-more {
    display: block;
    width: 120px;
    font-size: 32px;
    text-align: center;
    background: rgba(255, 255, 255, .8);
    line-height: 36px;
    font-weight: bold;
    color: #d3a180;
    transition: all .3s linear;
    &:hover {
      background: #fff;
    }
  }
  /deep/ .theme-box-title {
    margin-bottom: 16px;
    font-size: 46px;
    font-weight: bold;
    color: rgba(255, 255, 255, 8);
  }
  /deep/ .theme-box-slogan {
    margin-bottom: 16px;
    font-size: 24px;
    color: #fff;
  }
  /deep/ .modal-box {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    padding: 30px;
    width: 100%;
    height: 100%;
    font-size: 18px;
    color: #fff;
    transition: all .3s linear;
    background: url('../../assets/images/modal-h540.png') repeat-x;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    bottom: 40px;
  }
  /deep/ .swiper-pagination-bullet {
    width: 40px;
    height: 5px;
    border-radius: 0;
    background: $themeColor;
    cursor: pointer;
  }
  .index-video {
    position: relative;
    width: 100vw;
    // height: 100vh;
    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    .word {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 9;
      font-size: 52px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      text-shadow: 0 0 10px rgba(0, 0, 0, .2);
      transform: translate(-50%, -50%);
    }
  }
  .index-footer {
    width: 100%;
    height: 250px;
    background: #dfdfdf;
  }
  .index-footer-link {
    padding: 90px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      width: calc(100% / 6);
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        color: #333;
      }
    }
    .daq-icon {
      margin-bottom: 26px;
      width: 120px;
      height: 120px;
      color: #333;
      font-size: 50px;
      text-align: center;
      line-height: 120px;
      border: 1px solid #999;
    }
  }
</style>
