<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs :lv2="crumbsLv2" :lv4="crumbsLv4" />
    <!-- 列表banner -->
    <SubPageBanner channelCode="wymsh" :title="crumbsLv4" />
    <!-- 列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">{{title}}</p>
            <p class="daq-list-slogan">{{slogan}}</p>
          </div>
        </div>
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
              <a :href="`news-detail.html?id=${item.id}`">
                <span class="img-box">
                  <img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
                </span>
                <div class="word-box">
                  <p class="name" :title="item.title">{{item.title | elipsisName}}</p>
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
import Tools from '@/utils/tools'
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
      title: '',
      slogan: '',
      params: {
        channelCode: Tools.getUrlParams('channelCode')
      },
      code: Tools.getUrlParams('code'),
      crumbsLv2: {},
      crumbsLv4: ''
    }
  },
  filters: {
    elipsisName (val) {
      let str = ''
      if (val.length > 16) {
        str = '...' 
      }
      return val.slice(0, 16) + str
    },
    elipsisSummary (val) {
      let str = ''
      if (val.length > 50) {
        str = '...' 
      }
      return val.slice(0, 50) + str
    }
  },
  created () {
    if (this.code === 'info') {
      this.crumbsLv2 = {
        name: '实用信息',
        href: 'info.html?code=info'
      }
    }
    switch (this.params.channelCode) {
      case 'wymsh':
        this.crumbsLv4 = '文艺慢生活'
        this.title = '天府之国屯聚的安逸风气'
        this.slogan = '一步繁华，一步安逸，四川慢生活是我们想而不可得的悠闲'
        break
      case 'jxgsh':
        this.crumbsLv4 = '街巷故事汇'
        this.title = '走走老街巷 听听老故事'
        this.slogan = '一条老街，一段历史，几代人的记忆，时间冲刷下的古街总是美丽神秘藏着许多故事'
        break
      case 'whfw':
        this.crumbsLv4 = '文化服务'
        this.title = '天府之国屯聚的安逸风气'
        this.slogan = '一步繁华，一步安逸，四川慢生活是我们想而不可得的悠闲'
        break
      case 'zdwyhdyzyb':
        this.crumbsLv4 = '重点文艺活动一周预报'
        this.title = '走走老街巷 听听老故事'
        this.slogan = '一条老街，一段历史，几代人的记忆，时间冲刷下的古街总是美丽神秘藏着许多故事'
        break
    }
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
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
      font-size: 20px;
      font-weight: bold;
    }
    .summary {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
