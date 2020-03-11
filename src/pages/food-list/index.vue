<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv4="crumbsLv4"  
    />
    <!-- 美食列表banner -->
    <SubPageBanner
      channelCode="chcbt"
      title="四川美食"
    />
    <!-- 美食列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">四川，美食之都！</p>
            <p class="daq-list-slogan">对于许多游客而言，享受当地的美食绝对是旅行计划的”必选“项目。如果美味的佳肴是你行程中的重点，那么来四川一定不会让你失望。</p>
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
                    @click="chooseTag(item.tagId, index)"
                  >{{item.name}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <daq-scroll-load
          requestName="getFoodList"
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
              <a :href="`food-detail.html?code=destination&id=${item.id}`">
                <span class="img-box">
                  <img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
                </span>
                <div class="word-box">
                  <p class="name" :title="item.name">{{item.name}}</p>
                  <p class="summary" :title="item.summary">{{item.summary | elipsisSummary}}</p>
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
import SubPageBanner from '@/widgets/sub-page-banner'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
export default {
  components: {
    daqScrollLoad,
    SubPageBanner,
    Header,
    Footer,
    Crumbs
  },
  data () {
    return {
      list: [],
      params: {
        tag: ''
      },
      tagIndex: 0,
      tagTxt: '筛选',
      tagList: [
        {
          name: '全部',
          tagId: ''
        }
      ],
      crumbsLv2: {
        name: '目的地',
        href: 'destination.html?code=destination'
      },
      crumbsLv4: '吃货藏宝图'
    }
  },
  filters: {
    elipsisSummary (val) {
      let str = ''
      if (val.length > 50) {
        str = '...' 
      }
      return val.slice(0, 50) + str
    }
  },
  mounted () {
    this.getSiteTags()
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
    },
    chooseTag (tagId, index) {
      this.tagIndex = index
      if (index) {
        this.tagTxt = this.tagList[index].name
      } else {
        this.tagTxt = '筛选'
      }
      this.params.tag = tagId
      this.list = []
    },
    getSiteTags () {
      Ajax.getSiteTags({
        type: 'food'
      }).then(res => {
        if (res.code === 0) {
          this.tagList = this.tagList.concat(res.datas)
        }
      })
    }
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
    padding: 28px 20px 30px;
    height: 140px;
    border: 1px solid #ececec;
    p {
      color: #666;
      font-size: 0;
    }
    .name {
      margin-bottom: 20px;
      width: 100%;
      font-size: 20px;
      font-weight: bold;
      @include ellipsis();
    }
    .summary {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
