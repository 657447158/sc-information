<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 广告banner -->
    <div class="hot-banner">
      <swiper :options="adOptions" v-if="adList.length">
        <swiperSlide
          v-for="(item, index) in adList"
          :key="index"
        >
          <img :src="item.pics[0]" />
        </swiperSlide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        <daq-scroll-load
          requestName="getNewsList"
          :params="params"
          :limit="9"
          @list="getList"
        >
          <ul class="daq-list" slot="list">
            <li
              class="daq-list-item"
              v-for="(item, index) in list"
              :key="index"
            >
              <a :href="item.url" target="_blank">
                <span class="img-box">
                  <img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
                </span>
                <div class="word-box">
                  <p class="date">{{item.publishtime | formaterDate}}</p>
                  <p class="name" :title="item.title">{{item.title}}</p>
                  <p class="summary" :title="item.summary">{{item.summary | ellipsisSummary}}</p>
                  <p class="more">查看更多 >></p>
                </div>
              </a>
            </li>
          </ul>
        </daq-scroll-load>
      </div>
    </div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Ajax from '@/service'
import daqScrollLoad from '@/components/scrollLoad'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
export default {
  components: {
    daqScrollLoad,
    Header,
    Footer,
    swiper,
    swiperSlide
  },
  data () {
    return {
      list: [],
      adList: [],
      params: {
        channelCode: 'rmhd'
      },
      adOptions: {
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      }
    }
  },
  filters: {
    formaterDate (val) {
      return val.split(' ')[0]
    },
    ellipsisSummary (val) {
      let str = ''
      if (val.length > 50) {
        str = '...' 
      }
      return val.slice(0, 50) + str
    }
  },
  mounted () {
    this.getAdList()
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
    },
    getAdList () {
      Ajax.getAdList({
        adCode: 'pc_rmhd'
      }).then(res => {
        if (res.code === 0) {
          this.adList = res.datas
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-banner {
  position: relative;
  margin-top: 120px;
  width: 100%;
  height: 680px;
  background: #e2e2e2;
  /deep/ .swiper-slide {
    height: 680px;
  }
  /deep/ .swiper-pagination {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    .swiper-pagination-bullet {
      margin-right: 6px;
      width: 36px;
      height: 6px;
      background: #acaeaf;
      border-radius: 0;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: $themeColor;
    }
  }
}
.daq-list-wrap {
  min-height: 840px;
  .title-box {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.daq-list-title {
  font-size: 36px;
  font-weight: bold;
}
.daq-list-slogan {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}
.daq-list {
  margin-top: 100px;
  overflow: hidden;
}
.daq-list-item {
  margin-bottom: 41px;
  float: left;
  width: 426px;
  &~&:not(:nth-child(3n+1)) {
    margin-left: 41px;
  }
  &:hover img {
    transform: scale(1.1);
  }
  .img-box {
    position: relative;
    display: block;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: #e2e2e2;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .word-box {
    padding: 28px 30px 30px;
    height: 250px;
    border: 1px solid #ececec;
    p {
      color: #666;
    }
    .date {
      margin-bottom: 30px;
      color: #999;
    }
    .name {
      position: relative;
      margin-bottom: 50px;
      font-size: 16px;
      font-weight: bold;
      @include ellipsis();
      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        display: block;
        width: 40px;
        height: 2px;
        background: #999;
      }
    }
    .summary {
      margin-bottom: 30px;
      font-size: 14px;
      color: #666;
    }
    .more {
      color: #666;
    }
  }
}
</style>
