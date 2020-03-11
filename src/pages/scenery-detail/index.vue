<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv3="crumbsLv3"
    />
    <!-- 详情banner s -->
    <div class="scenery-detail-banner">
      <img :src="detail.pictureTwoToOne" />
      <div class="main">
        <div class="name-box">
          <p>{{detail.name}}</p>
          <span class="tag">{{detail.levelName}}</span>
        </div>
      </div>
    </div>
    <!-- 详情banner e -->
    <div class="scenery-detail-wrap" v-if="Object.keys(detail).length">
      <div class="main">
        <div class="scenery-detail-top">
          <div class="left">
            <p class="title">概述</p>
            <p class="summary">{{detail.summary | ellipsisSummary}}</p>
            <a class="tag" :href="detail.panoramaPath" v-if="detail.panoramaPath" target="_blank">720全景</a>
          </div>
          <div class="right">
            <p class="title">温馨小贴士</p>
            <div class="right-item">
              <span class="daq-icon">&#xe66d;</span>
              <span>服务热线：{{detail.phone}}</span>
            </div>
            <div class="right-item">
              <span class="daq-icon">&#xe670;</span>
              <span>开放时间：{{detail.opentime}}</span>
            </div>
            <div class="right-item">
              <span class="daq-icon">&#xe667;</span>
              <span>景区地址：{{detail.address}}</span>
            </div>
            <div class="right-item">
              <span class="daq-icon">&#xe66b;</span>
              <span>官网网站：<a :href="detail.site">{{detail.site}}</a></span>
            </div>
          </div>
        </div>
        <div class="scenery-detail-ct" v-html="detail.introduce"></div>
      </div>
    </div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import Tools from '@/utils/tools'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
export default {
  components: {
    Header,
    Footer,
    Crumbs
  },
  filters: {
    ellipsisSummary (val) {
      let str = val
      if (val.length > 200) {
        str = val.slice(0, 200) + '...'
      }
      return str
    }
  },
  data () {
    return {
      id: Tools.getUrlParams('id'),
      detail: {},
      crumbsLv2: {
        name: '目的地',
        href: 'destination.html?code=destination'
      },
      crumbsLv3: {
        name: '悠闲好光景',
        href: 'scenery-list.html?code=destination'
      }
    }
  },
  mounted () {
    this.getSceneryDetail()
  },
  methods: {
    getSceneryDetail () {
      Ajax.getSceneryDetail({
        sceneryId: this.id
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scenery-detail-banner {
  margin-top: 120px;
  width: 100%;
  height: 680px;
  overflow: hidden;
  .main {
    position: relative;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .name-box {
    position: absolute;
    bottom: 80px;
    left: 0;
    font-size: 46px;
    font-weight: bold;
    color: #fff;
  }
  .tag {
    display: block;
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 0 16px;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    background: rgba(0, 0, 0, .4);
    transform: translateX(100%);
  }
}
.scenery-detail-wrap {
  padding: 60px 0 100px;
  width: 100%;
  background: #f5f5f5;
}
.scenery-detail-top {
  display: flex;
  height: 340px;
  .left {
    padding: 60px 40px 0;
    width: 50%;
    height: 100%;
    background: #fff;
    .title::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 0;
      display: block;
      width: 40px;
      height: 3px;
      background: #cccccc;
    }
  }
  .right {
    padding: 60px 40px 0;
    width: 50%;
    height: 100%;
    background: #e3e3e3;
    &-item {
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      color: #666
    }
    .daq-icon {
      margin-right: 10px;
      font-size: 16px;
      color: #666;
    }
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .title {
    position: relative;
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: bold;
  }
  .summary {
    line-height: 24px;
    color: #666;
  }
  .tag {
    margin-top: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    height: 32px;
    color: #666;
    border-radius: 16px;
    border: 1px solid;
    cursor: pointer;
    transition: all .3s linear;
    &:hover {
      color: $themeColor;
    }
  }
}
.scenery-detail-ct {
  margin-top: 40px;
  padding: 60px 40px;
  background: #fff;
}
</style>
