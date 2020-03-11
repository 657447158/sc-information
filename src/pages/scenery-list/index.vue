<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv4="crumbsLv4"
    />
    <!-- 景点列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">您的所想与未见，都值得去实现</p>
            <p class="daq-list-slogan">你渴望的彼岸和远方....去你想去的地方、吃你想吃的美食、看你想看的风景</p>
          </div>
          <!-- 下拉筛选 -->
          <div class="down-box">
            <div class="down-box-item">
              <span>{{levelTxt}}</span>
              <span class="daq-icon">&#xe6af;</span>
              <div class="down-modal">
                <div class="down-modal-box">
                  <a
                    :class="levelIndex === index && 'active'"
                    href="javascript:;"
                    v-for="(item, index) in levelList"
                    :key="index"
                    @click="chooseLevel(item.resourceLevel, index)"
                  >{{item.name}}</a>
                </div>
              </div>
            </div>
            <div class="down-box-item">
              <span>{{regionTxt}}</span>
              <span class="daq-icon">&#xe6af;</span>
              <div class="down-modal">
                <div class="down-modal-box down-modal-region">
                  <a
                    :class="regionIndex === index && 'active'"
                    href="javascript:;"
                    v-for="(item, index) in regionList"
                    :key="index"
                    @click="chooseRegion(item.region, index)"
                  >{{item.name}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <daq-scroll-load
          requestName="getSceneryList"
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
              <a :href="`scenery-detail.html?code=destination&id=${item.id}`">
                <span class="img-box">
                  <img v-if="item.pictureFourToThree" :src="item.pictureFourToThree" />
                  <span class="tag">{{item.levelName}}</span>
                </span>
                <div class="word-box">
                  <p class="name" :title="item.name">{{item.name}}</p>
                  <p class="info">
                    <span class="daq-icon">&#xe667;</span>
                    <span class="ct" :title="item.address">地址：{{item.address}}</span>
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
import Ajax from '@/service'
import daqScrollLoad from '@/components/scrollLoad'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
export default {
  components: {
    daqScrollLoad,
    Header,
    Footer,
    Crumbs
  },
  data () {
    return {
      list: [],
      params: {
        region: 510000,
        resourceLevel: '',
      },
      levelIndex: 0,
      regionIndex: 0,
      levelTxt: '级别',
      regionTxt: '区域',
      levelList: [
        {
          name: '全部',
          resourceLevel: ''
        },
        {
          name: '5A级景区',
          resourceLevel: 'viewType_16'
        },
        {
          name: '4A级景区',
          resourceLevel: 'viewType_15'
        },
        {
          name: '3A级景区',
          resourceLevel: 'viewType_14'
        },
        {
          name: '2A级景区',
          resourceLevel: 'viewType_13'
        },
        {
          name: 'A级景区',
          resourceLevel: 'viewType_12'
        },
        {
          name: '非A级景区',
          resourceLevel: 'viewType_00'
        },
      ],
      regionList: [
        {
          name: '全部',
          region: 510000
        }
      ],
      crumbsLv2: {
        name: '目的地',
        href: 'destination.html?code=destination'
      },
      crumbsLv4: '悠闲好光景'
    }
  },
  mounted () {
    this.getSiteRegions()
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
    },
    chooseLevel (resourceLevel, index) {
      this.levelIndex = index
      if (index) {
        this.levelTxt = this.levelList[index].name
      } else {
        this.levelTxt = '级别'
      }
      this.params.resourceLevel = resourceLevel
      this.list = []
    },
    chooseRegion (region, index) {
      this.regionIndex = index
      if (index) {
        this.regionTxt = this.regionList[index].name
      } else {
        this.regionTxt = '区域'
      }
      this.params.region = region
      this.list = []
    },
    getSiteRegions () {
      Ajax.getSiteRegions()
        .then(res => {
          if (res.code === 0) {
            this.regionList = this.regionList.concat(res.datas)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.daq-list-wrap {
  padding-top: 170px;
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
        &:last-child {
          width: 100%;
          // flex: 1;
        }
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
  height: 320px;
  overflow: hidden;
  background: #e2e2e2;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.daq-list-item .tag {
  position: absolute;
  display: block;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  padding: 0 16px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  line-height: 32px;
  background: rgba(0, 0, 0, .4);
}
.daq-list-item .word-box {
  padding: 28px 20px 30px;
  border: 1px solid #ececec;
}
.daq-list-item:hover .img-box img {
  transform: scale(1.1);
}
.daq-list-item .word-box p {
  margin-bottom: 20px;
  color: #666;
  font-size: 0;
}
.daq-list-item .word-box .name {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
  @include ellipsis();
}
.daq-list-item .word-box .info {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.daq-list-item .word-box .info img {
  margin-right: 8px;
}
.daq-list-item .word-box .info .daq-icon {
  margin-right: 8px;
  font-size: 18px;
  color: #666;
}
.daq-list-item .word-box .info .ct {
  flex: 1;
  @include ellipsis();
}
</style>
