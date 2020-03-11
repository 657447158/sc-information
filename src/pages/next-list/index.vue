<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑导航 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv4="title"
    />
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
          <div class="daq-waterfall" slot="list">
            <ul class="daq-list" ref="left">
              <li
                class="daq-list-item"
                v-for="(item, index) in leftList"
                :key="index"
              >
                <a :href="`news-detail.html?code=next&id=${item.id}`">
                  <span class="img-box">
                    <img v-if="item.coverTwoToThree" :src="item.coverTwoToThree" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                    <div class="date">
                      <span class="daq-icon">&#xe670;</span>
                      <span>{{item.publishtime | formatDate}}</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="daq-list" ref="mid">
              <li
                class="daq-list-item"
                v-for="(item, index) in midList"
                :key="index"
              >
                <a :href="`news-detail.html?code=next&id=${item.id}`">
                  <span class="img-box">
                    <img v-if="item.coverTwoToThree" :src="item.coverTwoToThree" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                    <div class="date">
                      <span class="daq-icon">&#xe670;</span>
                      <span>{{item.publishtime | formatDate}}</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="daq-list" ref="right">
              <li
                class="daq-list-item"
                v-for="(item, index) in rightList"
                :key="index"
              >
                <a :href="`news-detail.html?code=next&id=${item.id}`">
                  <span class="img-box">
                    <img v-if="item.coverTwoToThree" :src="item.coverTwoToThree" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                    <div class="date">
                      <span class="daq-icon">&#xe670;</span>
                      <span>{{item.publishtime | formatDate}}</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
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
      title: '',
      slogan: '',
      params: {
        channelCode: Tools.getUrlParams('channelCode')
      },
      code: Tools.getUrlParams('code'),
      liWidth: 426,
      leftList: [],
      midList: [],
      rightList: [],
      crumbsLv2: {}
    }
  },
  filters: {
    formatDate (val) {
      if (val) {
        return val.split(' ')[0]
      } else {
        return null
      }
    }
  },
  created () {
    if (this.code === 'next') {
      this.crumbsLv2 = {
        name: '下一站，出发',
        href: 'next.html?code=next'
      }
    }
    switch (this.params.channelCode) {
      case 'zrfg':
        this.title = '自然风光'
        this.slogan = '霞光与雪山，山川与河流，草原与湿地，每一段旅程都是美好的体验'
        break
      case 'mlrw':
        this.title = '魅力人文'
        this.slogan = '岁月留下宝贵礼物，等你一起开启巴蜀大地时光密码'
        break
      case 'jdcq':
        this.title = '经典传奇'
        this.slogan = '人类宝贵的文明财富，在凝固的时间里看见过去'
        break
      case 'xxty':
        this.title = '休闲体验'
        this.slogan = '对时间最好的珍视，就是去这些有趣的地方撒野'
        break
      case 'jrkh':
        this.title = '假日狂欢'
        this.slogan = '假期清单在手，保你耍安逸~'
        break
      case 'tflymx':
        this.title = '天府旅游名县'
        this.slogan = '争创世界重要旅游目的地，推动治蜀兴川再上新台阶'
        break
    }
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
      this.$nextTick(() => {
        this.updateWaterfall()
      })
    },
    // 瀑布流数据排序
    updateWaterfall () {
      const leftHeight = this.$refs.left.clientHeight
      const midHeight = this.$refs.mid.clientHeight
      const rightHeight = this.$refs.right.clientHeight
      let item = this.list.shift()
      if (!item) return
      const arr = [leftHeight, midHeight, rightHeight]
      const index = arr.indexOf(Math.min.apply(null, arr))
      switch (index) {
        case 0:
          this.leftList.push(item)
          break
        case 1:
          this.midList.push(item)
          break
        case 2:
          this.rightList.push(item)
          break
      }
      this.$nextTick(() => {
        if (item.coverTwoToThree) {
          const img = new Image()
          img.src = item.coverTwoToThree
          img.onload = () => {
            this.updateWaterfall()
          }
        } else {
          this.updateWaterfall()
        }
      })
    },
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
.daq-waterfall {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.daq-list {
  margin-top: 60px;
  width: 426px;
  overflow: hidden;
}
.daq-list-item {
  margin-bottom: 40px;
  width: 100%;
  a {
    display: block;
  }
  &:hover img {
    transform: scale(1.1);
  }
  .img-box {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    background: #e2e2e2;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .word-box {
    padding: 28px 24px 30px;
    height: 112px;
    border: 1px solid #ececec;
    .name {
      margin-bottom: 20px;
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      @include ellipsis();
    }
    .date {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #999;
      .daq-icon {
        margin-right: 8px;
        font-size: 18px;
      }
    }
  }
}
</style>
