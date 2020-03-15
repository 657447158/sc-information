<template>
  <div id="app">
    <!-- header s -->
    <div class="header">
      <a href="index.html">
        <img src="@/assets/images/logo.png" />
      </a>
      <div class="header-input">
        <input
          type="text"
          :placeholder="$t('header.nav[3]')"
          @keyup.enter="search"
          v-model="keyword"
        >
        <span class="daq-icon" @click="search">&#xe673;</span>
      </div>
    </div>
    <!-- header e -->
    <!-- 搜索导航条 s -->
    <div class="search-tab">
      <span
        class="search-tab-item"
        :class="tabIndex === index && 'active'"
        v-for="(item, index) in tabList"
        :key="index"
        @click="chooseTab(index)"
      >{{item.name}}</span>
    </div>
    <!-- 搜索导航条 e -->
    <p class="search-tips">Here are the results for you to find "{{keyword}}"<span v-if="tabIndex !== 0">{{total}}条</span></p>
    <div class="search-result" v-if="!noData">
      <!-- 新闻资讯 -->
      <div class="search-result-item" v-if="newsList.length"> 
        <div class="search-result-top">
          <span>News</span>
          <!-- <a href="news-list.html">More >></a> -->
        </div>
        <ul class="search-result-list">
          <li
            class="search-result-list-item item1"
            v-for="item in newsList"
            :key="item.id"
          >
            <a class="title" :href="`article-detail.html?id=${item.id}`">{{item.title}}</a>
            <p class="summary" :title="item.summary">{{item.summary | ellipsisSummary}}</p>
          </li>
        </ul>
      </div>
      <!-- 目的地 -->
      <div class="search-result-item" v-if="destinationList.length">
        <div class="search-result-top">
          <span>Destination</span>
          <a href="destination.html?code=destination">More >></a>
        </div>
        <ul class="search-result-list">
          <li
            class="search-result-list-item item1"
            v-for="item in destinationList"
            :key="item.id"
          >
            <a class="title" :href="`destination-detail.html?code=destination&id=${item.id}`">{{item.regionName}}</a>
            <p class="summary" :title="item.introduction">{{item.introduction | ellipsisSummary}}</p>
          </li>
        </ul>
      </div>
    </div>
    <Loading :noData="!noData" v-else />
    <!-- 暂无数据 -->
    <div class="daq-no-data" v-if="empty"></div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import Tools from '@/utils/tools'
import Ajax from '@/service'
import Loading from '@/widgets/loading'
import Footer from '@/widgets/footer'
export default {
  components: {
    Footer,
    Loading
  },
  data () {
    return {
      total: 0,
      empty: false,
      noData: true,
      tabIndex: 0,
      tabList: [
        {
          name: 'Home',
          type: ''
        }, 
        {
          name: 'Destination',
          type: 'destination'
        },
        {
          name: 'Theme ravel',
          type: 'type_news'
        },
        {
          name: 'Practical information',
          type: 'type_news'
        }
      ],
      keyword: decodeURI(Tools.getUrlParams('keyword')),
      detail: {},
      type: '',
      destinationList: [],
      sceneryList: [],
      hotelList: [],
      travelList: [],
      guideList: [],
      foodList: [],
      newsList: [],
      activityList: []
    }
  },
  filters: {
    ellipsisSummary (val) {
      let str = val
      if (val.length > 200) {
        str = val.slice(0, 200) + '...'
      }
      return str
    },
    ellipsisSummary1 (val) {
      let str = val
      if (val.length > 50) {
        str = val.slice(0, 50) + '...'
      }
      return str
    }
  },
  mounted () {
    this.getSearchAll()
  },
  methods: {
    search () {
      this.getSearchAll()
    },
    chooseTab (index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
      this.type = this.tabList[index].type
      this.getSearchByType()
    },
    getSearchAll () {
      Ajax.getSearchAll({
        params: this.keyword
      }).then(res => {
        this.noData = false
        if (res.code === 0) {
          this.detail = res.data
          this.valuationList(res.data)
          if (this.detail.destination.length || this.detail.type_news.length) {
            this.noData = false
          } else {
            this.empty = true
          }
        }
      })
    },
    initList () {
      this.total = 0
      this.destinationList = []
      this.newsList = []
    },
    valuationList (data) {
      this.total = data.destination.length + data.type_news.length
      if (!this.total) {
        this.empty = true
      }
      this.destinationList = data.destination
      this.newsList = data.type_news
    },
    getSearchByType () {
      this.noData = true
      this.empty = false
      this.initList()
      if (this.type) {
        Ajax.getSearchByType({
          type: this.type,
          params: this.keyword,
          limitPage: 15
        }).then(res => {
          this.noData = false
          switch (this.type) {
            case 'destination':
              this.destinationList = res.datas
              break
            case 'type_news':
              this.newsList = res.datas
              break
          }
          this.total = res.datas.length
          if (!this.total) {
            this.empty = true
          }
        })
      } else {
        this.noData = false
        this.valuationList(this.detail)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .daq-no-data {
    width: 100%;
    height: 400px;
    background: url('../../assets/images/daq-no-data.png') no-repeat center;
  }
  .header {
    position: sticky;
    top: 0;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 66px;
    background: #fff;
    img {
      height: 40px;
    }
    &-input {
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 300px;
      height: 32px;
      background: #ebebeb;
      border-radius: 5px;
      input {
        width: 250px;
        height: 100%;
        border: none;
        outline: none;
        font-size: 12px;
        background: none;
        &::placeholder {
          color: #999;
        }
      }
      .daq-icon {
        font-size: 20px;
        cursor: pointer;
        color: #959595;
        &:hover {
          color: $themeColor;
        }
      }
    }
  }
  .search {
    &-tab {
      position: sticky;
      top: 66px;
      padding: 0 76px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 52px;
      background: #f5f5f5;
      &-item {
        position: relative;
        // width: 56px;
        line-height: 52px;
        color: #666;
        text-align: center;
        cursor: pointer;
        &~& {
          margin-left: 20px;
        }
        &.active {
          color: $themeColor;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            display: block;
            width: 100%;
            height: 3px;
            background: $themeColor;
          }
        }
        &:hover {
          color: $themeColor;
        }
      }
    }
    &-tips {
      margin: 30px 0 60px;
      padding: 0 90px;
      color: #999;
    }
    &-result {
      padding: 0 90px;
      &-item {
        margin-bottom: 50px;
      }
      &-top {
        padding: 0 20px 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        span {
          font-size: 16px;
          font-weight: bold;
        }
        a {
          font-size: 12px;
          color: $themeColor;
        }
      }
      &-list {
        &.list1 {
          display: flex;
          flex-wrap: wrap;
        }
        &-item {
          margin-top: 30px;
          display: flex;
          &:hover img {
            transform: scale(1.1);
          }
          &.item1 {
            flex-direction: column;
          }
          &.item2 {
            width: 460px;
            flex-direction: column;
          }
        }
        .title {
          display: block;
          margin: 0 0 24px;
          font-size: 16px;
          color: #444;
          width: 100%;
          @include ellipsis();
          &:hover {
            color: $themeColor;
          }
        }
        .title1 {
          display: flex;
          align-items: center;
          margin: 0 0 24px;
          font-size: 16px;
          color: #444;
          width: 100%;
          @include ellipsis();
          .daq-icon {
            margin-left: 10px;
            font-size: 18px;
          }
          .icon1 { color: #00a0ed; }
          .icon2 { color: #f12a79; }
        }
        .summary {
          color: #888;
          line-height: 24px;
        }
        .img-box {
          display: block;
          width: 180px;
          height: 130px;
          background: #e2e2e2;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .word-box {
          padding: 10px 15px;
          width: 280px;
          .item {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            color: #666;
          }
          .daq-icon {
            margin-right: 10px;
            color: #666;
          }
          .ct {
            flex: 1;
            @include ellipsis();
          }
        }
        .info-item {
          margin-bottom: 24px;
          color: #666;
        }
      }
    }
  }
</style>
