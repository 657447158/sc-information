<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="article-container main">
      <Loading :noData="!loading" />
      <!-- 左侧菜单 -->
      <ul class="menu">
        <li
          v-for="(item, index) in menus"
          :key="item.id"
          :class="menuIndex === index && 'active'"
          @click="changTab(index)"
        >{{item.name}}</li>
      </ul>
      <div 
        class="article"
        v-if="qList.length"
      >
        <p class="article-title">{{menus[menuIndex].name}}</p>
        <div>
          <p
            class="article-q"
            v-for="item in qList"
            :key="item.id"
            @click="goTo(item.id)"
          >{{item.title}}</p>
        </div>
        <div class="answer">
          <div 
            class="answer-item"
            v-for="item in qList"
            :id="item.id"
            :key="item.id"
          >
            <p class="answer-title">Q: {{item.title}}</p>
            <div v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import Loading from '@/widgets/loading'
import tools from '@/utils/tools.js'
export default {
  components: {
    Header,
    Footer,
    Loading
  },
  mixins: [scrollAnimate],
  data () {
    return {
      loading: false,
      channelCode: tools.getUrlParams("code"),
      menus: [],
      menuIndex: 0,
      qList: [],
      originD: 0,
      QDom: null,
      fDistance: 0
    }
  },
  mounted () {
    this.getChannelList()
  },
  methods: {
    goTo (id) {
      this.originD = 0
      this.fDistance = 0
      this.QDom = document.getElementById(id)
      this.fDistance = this.QDom.offsetTop - 100
      console.log('this.fDistance', this.fDistance);
      window.requestAnimationFrame(this.step)
    },
    step () {
      const distance = this.QDom.offsetTop
      const v = distance / 10
      this.originD = this.originD + v
      console.log('this.originD', this.originD);
      if (this.originD > this.fDistance) {
        document.documentElement.scrollTop = this.fDistance
      } else {
        document.documentElement.scrollTop = this.originD
      }
      if (distance - document.documentElement.scrollTop > 100 && document.documentElement.scrollTop < document.body.scrollHeight) {
        window.requestAnimationFrame(this.step)
      }
    },
    changTab (index) {
      if (this.menuIndex === index) return
      this.menuIndex = index
      this.getNewsList(this.menus[index].channelCode)
    },
    getChannelList () {
      this.loading = true
      Ajax.getChannelList({
        channelCode: this.channelCode
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.menus = res.datas
          if (res.datas[0]) {
            this.getNewsList(res.datas[0].channelCode)
          }
        }
      })
    },
    getNewsList (channelCode) {
      this.qList = []
      this.loading = true
      Ajax.getNewsList({
        channelCode
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          res.datas.map((item) => {
            this.qList.push(item)
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #f5f5f5;
}
.article-container {
  position: relative;
  padding: 140px 0 100px;
  .menu {
    position: sticky;
    top: 80px;
    float: left;
    width: 340px;
    background: #fff;
    li {
      padding: 0 30px;
      line-height: 60px;
      font-size: 24px;
      color: #333;
      cursor: pointer;
      &.active {
        color: #fff;
        background: $themeColor;
        font-weight: bold;
      }
    }
  }
  .article {
    float: right;
    padding: 70px 40px;
    width: 1000px;
    background: #fff;
    &-title {
      margin-bottom: 30px;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    /deep/ img{
      max-width: 100%;
    }
    &-q {
      padding-left: 10px;
      display: flex;
      align-items: center;
      position: relative;
      font-size: 16px;
      color: #666;
      line-height: 40px;
      border-bottom: 1px dotted #cfcfcf;
      transition: all .3s linear;
      cursor: pointer;
      &::before {
        content: '';
        margin-right: 12px;
        display: block;
        width: 6px;
        height: 6px;
        background: $themeColor;
      }
      &:hover {
        color: $themeColor;
      }
    }
  }
  .answer {
    margin-top: 48px;
    &-item {
      margin-bottom: 60px;
    }
    &-title {
      margin-bottom: 28px;
      font-size: 16px;
      color: $themeColor;
    }
  }
}
</style>
