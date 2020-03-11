<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs :lv2="crumbsLv2" :lv4="crumbsLv4" />
    <!-- 酒店列表banner -->
    <SubPageBanner
      channelCode="jdzs"
      title="酒店住宿"
    />
    <!-- 酒店列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">精挑细选，只为了你</p>
            <p class="daq-list-slogan">房型丰富，风格迥异更养眼；暂别奔忙，来这里品味慢生活...</p>
          </div>
          <!-- 下拉筛选 -->
          <div class="down-box">
            <div class="down-box-item">
              <span>{{tagTxt}}</span>
              <span class="daq-icon">&#xe6af;</span>
              <div class="down-modal">
                <div class="down-modal-box">
                  <a
                    :class="tagIndex === index && 'active'"
                    href="javascript:;"
                    v-for="(item, index) in tagList"
                    :key="index"
                    @click="chooseTag(item.grade, index)"
                  >{{item.name}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <daq-scroll-load
          requestName="getHotelList"
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
              <a :href="`http://api.map.baidu.com/marker?location=${item.latitude},${item.longitude}&title=我的位置&content=${item.name}&output=html`" target="_blank">
                <span class="img-box">
                  <img :src="item.pictureFourToThree" />
                </span>
                <div class="word-box">
                  <p class="name" :title="item.name">{{item.name}}</p>
                  <p class="info">
                    <span class="daq-icon">&#xe667;</span>
                    <span class="ct" :title="item.address">地址：{{item.address}}</span>
                    <span class="daq-icon nav">&#xe669;</span>
                  </p>
                  <p class="info">
                    <span class="daq-icon">&#xe66d;</span>
                    <span class="ct" :title="item.phone">电话：{{item.phone}}</span>
                  </p>
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
import SubPageBanner from '@/widgets/sub-page-banner'
import daqScrollLoad from '@/components/scrollLoad'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
export default {
  components: {
    SubPageBanner,
    daqScrollLoad,
    Header,
    Footer,
    Crumbs
  },
  data () {
    return {
      list: [],
      params: {
        grade: ''
      },
      tagIndex: 0,
      tagTxt: '筛选',
      tagList: [
        {
          name: '全部',
          grade: ''
        },
        {
          name: '高端酒店',
          grade: 'hotelType_12'
        },
        {
          name: '经济酒店',
          grade: 'hotelType_3'
        },
        {
          name: '商务酒店',
          grade: 'hotelType_15'
        },
        {
          name: '青年旅馆',
          grade: 'hotelType_8'
        },
        {
          name: '民宿酒店',
          grade: 'hotelType_4'
        }
      ],
      crumbsLv2: {
        name: '实用信息',
        href: 'info.html?code=info' 
      },
      crumbsLv4: '酒店住宿'
    }
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
    },
    chooseTag (grade, index) {
      this.tagIndex = index
      if (index) {
        this.tagTxt = this.tagList[index].name
      } else {
        this.tagTxt = '筛选'
      }
      this.params.grade = grade
      this.list = []
    },
  }
}
</script>

<style lang="scss" scoped>
.daq-list-wrap {
  min-height: 840px;
  .title-box {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .down-box {
    display: flex;
    align-items: center;
    &-item {
      position: relative;
      padding: 0 15px;
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 14px;
      color: #999;
      border-radius: 15px;
      border: 1px solid #d8d8d8;
      cursor: pointer;
      &:first-child {
        margin-right: 30px; 
      }
      &:hover {
        .daq-icon {
          transform: rotate(180deg);
        }
        .down-modal {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .daq-icon {
      margin-left: 10px;
      font-size: 12px;
      transition: all .3s linear;
    }
  }
  .down-modal {
    position: absolute;
    top: 28px;
    right: 0;
    z-index: 9;
    padding-top: 22px;
    visibility: hidden;
    opacity: 0;
    transition: all .3s linear;
    &-box {
      position: relative;
      padding: 28px 30px 0 0;
      width: 160px;
      background: #fff;
      border: 1px solid #ececec;
      box-shadow: 0 0 2px rgba(0, 0, 0, .1);
      border-radius: 8px;
      &::after {
        position: absolute;
        display: inline-block;
        top: -8px;
        right: 26px;
        width: 0;
        height: 0px;
        content: '';
        border-style: solid;
        border-width: 8px;
        border-color: #fff #fff transparent transparent;
        transform: rotate(-45deg);
        box-shadow: 2px -2px 2px #ececec;
      }
      a {
        margin-bottom: 28px;
        display: block;
        color: #666;
        text-align: right;
        &:hover,
        &.active {
          color: $themeColor;
        }
      }
    }
    &-region {
      display: flex;
      flex-wrap: wrap;
      width: 360px;
      a {
        width: calc(100% / 3);
      }
    }
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
  margin-top: 60px;
  overflow: hidden;
}
.daq-list-item {
  margin-bottom: 41px;
  float: left;
  width: 426px;
}
.daq-list-item~.daq-list-item:not(:nth-child(3n+1)) {
  margin-left: 41px;
}
.daq-list-item .img-box {
  position: relative;
  display: block;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #e2e2e2;
}
.daq-list-item .word-box {
  padding: 28px 20px 0;
  height: 160px;
  border: 1px solid #ececec;
}
.daq-list-item:hover .img-box img {
  transform: scale(1.1);
}
.daq-list-item .word-box p {
  color: #666;
  font-size: 0;
  &:last-child {
    margin-top: 20px;
  }
}
.daq-list-item .word-box .name {
  margin-bottom: 30px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  @include ellipsis();
}
.daq-list-item .word-box .info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  .ct {
    flex: 1;
    @include ellipsis();
  }
  .daq-icon {
    margin-right: 8px;
    font-size: 18px;
    color: #666;
  }
  .nav {
    margin-right: 0;
  }
}
</style>
