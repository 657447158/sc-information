<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs :lv2="crumbsLv2" :lv4="crumbsLv4" />
    <!-- 栏目banner -->
    <SubPageBanner
      channelCode="jtzz"
      title="交通指南"
    />
    <!-- 内容 -->
    <div class="traffic main">
      <p class="traffic-title">安心出行 解决您的后顾之忧</p>
      <p class="traffic-slogan">权威交通旅游攻略指南，为您提供旅游相关交通线路查询及交通线路工具</p>
      <ul class="traffic-list">
        <li
          class="traffic-list-item"
          v-for="item in list"
          :key="item.id"
        >
          <span class="img-box">
            <img :src="item.navImage" :alt="item.name" />
          </span>
          <div class="word-box">
            <p class="name">{{item.name}}</p>
            <p class="summary">{{item.summary | ellipsisSummary}}</p>
            <a class="more" :href="`channel-detail.html?code=info&channelCode=${item.channelCode}`">查看详情</a>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import SubPageBanner from '@/widgets/sub-page-banner'
import Crumbs from '@/widgets/crumbs'
export default {
  components: {
    Header,
    Footer,
    Crumbs,
    SubPageBanner,
  },
  data () {
    return {
      list: [],
      crumbsLv2: {
        name: '实用信息',
        href: 'info.html?code=info' 
      },
      crumbsLv4: '交通指南'
    }
  },
  filters: {
    ellipsisSummary (val) {
      let str = val
      if (val.length > 120) {
        str = val.slice(0, 120) + '...'
      }
      return str
    }
  },
  mounted () {
    Ajax.getChannelList({
      channelCode: 'jtzz'
    }).then(res => {
      if (res.code === 0) {
        this.list = res.datas
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.traffic {
  padding-top: 100px;
  &-title {
    font-size: 36px;
    font-weight: bold;
  }
  &-slogan {
    margin-top: 20px;
    font-size: 18px;
    color: #666;
  }
  &-list {
    margin: 60px 0 100px;
    &-item {
      display: flex;
      width: 100%;
      height: 380px;
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
      &:hover img {
        transform: scale(1.1);
      }
    }
    .img-box {
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
    .word-box {
      padding: 90px 40px 0;
      width: 50%;
      height: 100%;
      background: #f5f5f5;
    }
    .name {
      position: relative;
      font-size: 24px;
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -20px;
        display: block;
        width: 40px;
        height: 3px;
        background: #cccccc;
      }
    }
    .summary {
      margin-top: 50px;
      color: #666;
      line-height: 24px;
    }
    .more {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 102px;
      height: 32px;
      color: #666;
      border-radius: 16px;
      border: 1px solid #cdcdcd;
      &:hover {
        color: #fff;
        border: 1px solid $themeColor;
        background: $themeColor;
      }
    }
  }
}
</style>
