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
    <p class="search-tips">以下是为您找到“{{keyword}}”相关结果<span v-if="tabIndex !== 0">{{total}}条</span></p>
    <div class="search-result" v-if="!noData">
      <!-- 新闻资讯 -->
      <div class="search-result-item" v-if="newsList.length"> 
        <div class="search-result-top">
          <span>新闻资讯</span>
          <a href="news-list.html">查看更多新闻 >></a>
        </div>
        <ul class="search-result-list">
          <li
            class="search-result-list-item item1"
            v-for="item in newsList"
            :key="item.id"
          >
            <a class="title" :href="`news-detail.html?id=${item.id}`">{{item.title}}</a>
            <p class="summary" :title="item.summary">{{item.summary | ellipsisSummary}}</p>
          </li>
        </ul>
      </div>
      <!-- 热门活动 -->
      <div class="search-result-item" v-if="activityList.length"> 
        <div class="search-result-top">
          <span>热门活动</span>
          <a href="hot-activity.html?code=activity">查看更多热门活动 >></a>
        </div>
        <ul class="search-result-list">
          <li
            class="search-result-list-item item1"
            v-for="item in activityList"
            :key="item.id"
          >
            <a class="title" :href="item.externalChain" target="_blank">{{item.title}}</a>
            <p class="summary" :title="item.summary">{{item.summary | ellipsisSummary}}</p>
          </li>
        </ul>
      </div>
      <!-- 目的地 -->
      <div class="search-result-item" v-if="destinationList.length">
        <div class="search-result-top">
          <span>目的地</span>
          <a href="destination.html?code=destination">查看更多目的地 >></a>
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
      <!-- 景区 -->
      <div class="search-result-item" v-if="sceneryList.length">
        <div class="search-result-top">
          <span>景区</span>
          <a href="scenery-list.html?code=destination">查看更多景区 >></a>
        </div>
        <ul class="search-result-list list1">
          <li
            class="search-result-list-item"
            v-for="item in sceneryList"
            :key="item.id"
          >
            <span class="img-box">
              <img v-if="item.pictureFourToThree" :src="item.pictureFourToThree" />
            </span>
            <div class="word-box">
              <a class="title" :href="`scenery-detail.html?code=destination&id=${item.id}`">{{item.name}}</a>
              <div class="item">
                <span class="daq-icon">&#xe66d;</span>
                <span class="ct">{{item.phone}}</span>
              </div>
              <div class="item">
                <span class="daq-icon">&#xe667;</span>
                <span class="ct">{{item.address}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 酒店 -->
      <div class="search-result-item" v-if="hotelList.length">
        <div class="search-result-top">
          <span>酒店</span>
          <a href="hotel-list.html?code=destination">查看更多酒店 >></a>
        </div>
        <ul class="search-result-list list1">
          <li
            class="search-result-list-item"
            v-for="item in hotelList"
            :key="item.id"
          >
            <span class="img-box">
              <img v-if="item.pictureFourToThree" :src="item.pictureFourToThree" />
            </span>
            <div class="word-box">
              <a class="title1" :href="`http://api.map.baidu.com/marker?location=${item.latitude},${item.longitude}&title=我的位置&content=${item.name}&output=html`" target="_blank">{{item.name}}</a>
              <div class="item">
                <span class="daq-icon">&#xe66d;</span>
                <span class="ct">{{item.phone}}</span>
              </div>
              <div class="item">
                <span class="daq-icon">&#xe667;</span>
                <span class="ct">{{item.address}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 美食 -->
      <div class="search-result-item" v-if="foodList.length">
        <div class="search-result-top">
          <span>美食</span>
          <a href="food-list.html?code=destination">查看更多美食 >></a>
        </div>
        <ul class="search-result-list list1">
          <li
            class="search-result-list-item"
            v-for="item in foodList"
            :key="item.id"
          >
            <span class="img-box">
              <img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
            </span>
            <div class="word-box">
              <a class="title" :href="`food-detail.html?code=destination&id=${item.id}`">{{item.name}}</a>
              <p class="summary" :title="item.summary ">{{item.summary | ellipsisSummary1}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 旅行社 -->
      <div class="search-result-item" v-if="travelList.length"> 
        <div class="search-result-top">
          <span>旅行社</span>
          <a href="travel-agency.html?code=info">查看更多旅行社 >></a>
        </div>
        <ul class="search-result-list list1">
          <li
            class="search-result-list-item item2"
            v-for="item in travelList"
            :key="item.id"
          >
            <p class="title1">{{item.name}}</p>
            <div class="info-item">经营许可证：{{item.licenseno}}</div>
            <div class="info-item">旅行社类型：{{item.resourceLevel}}</div>
            <div class="info-item">旅行社电话：{{item.phone}}</div>
            <div class="info-item">旅行社地址：{{item.address}}</div>
          </li>
        </ul>
      </div>
      <!-- 导游 -->
      <div class="search-result-item" v-if="guideList.length"> 
        <div class="search-result-top">
          <span>导游</span>
          <a href="guide-list.html?code=info">查看更多导游 >></a>
        </div>
        <ul class="search-result-list list1">
          <li
            class="search-result-list-item item2"
            v-for="item in guideList"
            :key="item.id"
          >
            <p class="title1">
              <span>{{item.name}}</span>
              <span class="daq-icon icon1" v-if="item.sex === '男性'">&#xe636;</span>
              <span class="daq-icon icon2" v-if="item.sex === '女性'">&#xe637;</span>
            </p>
            <div class="info-item">导游等级：{{item.level}}</div>
            <div class="info-item">导游证号：{{item.identification}}</div>
            <div class="info-item">语言种类：{{item.language}}</div>
            <div class="info-item">所属公司：{{item.company}}</div>
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
          name: '全部',
          type: ''
        }, 
        {
          name: '目的地',
          type: 'destination'
        },
        {
          name: '景区',
          type: 'sourceType_1'
        },
        {
          name: '酒店',
          type: 'sourceType_2'
        },
        {
          name: '旅行社',
          type: 'sourceType_3'
        },
        {
          name: '导游',
          type: 'type_guide'
        },
        {
          name: '美食',
          type: 'sourceType_8'
        },
        {
          name: '新闻',
          type: 'type_news'
        },
        {
          name: '热门活动',
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
          if (this.detail.destination.length || this.detail.sourceType_1.length || this.detail.sourceType_2.length || this.detail.sourceType_3.length || this.detail.sourceType_8.length || this.detail.type_news.length || this.detail.type_guide.length) {
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
      this.sceneryList = []
      this.hotelList = []
      this.travelList = []
      this.guideList = []
      this.foodList = []
      this.newsList = []
      this.activityList = []
    },
    valuationList (data) {
      this.total = data.destination.length + data.sourceType_1.length + data.sourceType_2.length + data.sourceType_3.length + data.sourceType_8.length + data.type_news.length + data.type_guide.length
      if (!this.total) {
        this.empty = true
      }
      this.destinationList = data.destination
      this.sceneryList = data.sourceType_1
      this.hotelList = data.sourceType_2
      this.travelList = data.sourceType_3
      this.guideList = data.type_guide
      this.foodList = data.sourceType_8
      let activityList = []
      let newsList = []
      data.type_news.map(item => {
        if (item.channelCode === 'rmhd') {
          activityList.push(item)
        } else {
          newsList.push(item)
        }
      })
      this.newsList = newsList
      this.activityList = activityList
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
          let newsList = []
          let activityList = []
          switch (this.type) {
            case 'destination':
              this.destinationList = res.datas
              break
            case 'sourceType_1':
              this.sceneryList = res.datas
              break
            case 'sourceType_2':
              this.hotelList = res.datas
              break
            case 'sourceType_3':
              this.travelList = res.datas
              break
            case 'type_guide':
              this.guideList = res.datas
              break
            case 'sourceType_8':
              this.foodList = res.datas
              break
            case 'type_news':
              res.datas.map(item => {
                if (item.channelCode === 'rmhd') {
                  activityList.push(item)
                } else {
                  newsList.push(item)
                }
              })
              if (this.tabIndex === 7) {
                // 新闻
                this.newsList = newsList
              } else {
                this.activityList = activityList
              }
              break
          }
          if (this.type === 'type_news') {
            if (this.tabIndex === 7) {
              this.total = this.newsList.length
            } else {
              this.total = this.activityList.length
            }
          } else {
            this.total = res.datas.length
          }
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
        width: 56px;
        line-height: 52px;
        color: #666;
        text-align: center;
        cursor: pointer;
        &~& {
          margin-left: 10px;
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
