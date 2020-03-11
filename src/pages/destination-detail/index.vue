<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 面包屑 -->
    <Crumbs
      :lv2="crumbsLv2"
      :lv4="crumbsLv4"
    />
    <!-- 详情banner s -->
    <div class="des-banner">
      <img :src="detail.coverBackground" />
      <div class="main">
        <p class="des-title">{{detail.regionName}}</p>
        <div class="map" id="desMap"></div>
      </div>
    </div>
    <!-- 详情banner e -->
    <!-- 内容 s -->
    <div class="des-content">
      <div class="main">
        <div
          class="des-content-box"
          :class="{active: showMore, 'hide-ct': boxHeight > 120}"
          v-html="detail.content" ref="contentBox"
        ></div>
        <div class="des-content-more" v-if="boxHeight > 120">
          <span class="icon" :class="showMore && 'active'" @click="showMoreHandle"></span>
        </div>
      </div>
    </div>
    <!-- 内容 e -->
    <!-- 必游景点排行 -->
    <Scenery />
    <!-- 更多目的地 -->
    <Destination />
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import Ajax from '@/service'
import Tools from '@/utils/tools.js'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import Crumbs from '@/widgets/crumbs'
import Scenery from './modules/scenery'
import Destination from './modules/destination'
export default {
  components: {
    Header,
    Footer,
    Crumbs,
    Scenery,
    Destination
  },
  data () {
    return {
      id: Tools.getUrlParams('id'),
      detail: {},
      region: 510000,
      showMore: false,
      crumbsLv2: {
        name: '目的地',
        href: 'destination.html?code=destination'
      },
      crumbsLv4: '',
      boxHeight: 0
    }
  },
  mounted () {
    this.getDestinationInfo()
    this.drawMap()
  },
  methods: {
    showMoreHandle () {
      this.showMore = !this.showMore
    },
    getDestinationInfo () {
      Ajax.getDestinationInfo({
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
          this.crumbsLv4 = res.data.regionName
          let data = [[res.data.longitude, res.data.latitude, res.data.regionName]]
          this.drawMap(data)
          this.$nextTick(() => {
            this.boxHeight = this.$refs.contentBox.offsetHeight
          })
        }
      })
    },
    drawMap (list) {
      const myChart = echarts.init(document.getElementById('desMap'))
      axios.get(`http://filealiyun.geeker.com.cn/ued/map/regionJson/${this.region}.json`)
        .then(data => {
          echarts.registerMap(this.region, data.data)
          myChart.setOption({
            height: '100%',
            geo: {
              map: this.region,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'rgba(0,0,0,0.0)'
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: 'rgba(255, 255, 255, .6)',
                  borderColor: '#f77800'
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
            series: [
              {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: list,
                symbolSize: [26, 32],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QTBGMjk2NDMyQUUxMUVBQkU0NUUxMjY1MTZBNzQxMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QTBGMjk2NTMyQUUxMUVBQkU0NUUxMjY1MTZBNzQxMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhBMEYyOTYyMzJBRTExRUFCRTQ1RTEyNjUxNkE3NDEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhBMEYyOTYzMzJBRTExRUFCRTQ1RTEyNjUxNkE3NDEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+42qdKAAAAmVJREFUeNqslktIVFEYgO8dDatVpgxiEWURgi6qTQW26wVS4SajohAi3AnlKuwBQUJJQVCLFkEQLYISehAEBlGYLZqgIqRsiPIBgTa2UFNs+v44E8Nwz3/OdeaHj4F7/nu/Oef85xFOnAy0SMA2aIGtsA6Wm7Zx+AT9cB9eVfZks7YPhRZRCAfgDNQHfvEeziLr9RXVwC3YGSwsHkIbwvHCocmP9fC6CInEHhj42RnW2UQr4RmsCooPmcunyJKFojK4CyuC0sVauI0szBe1m6ryiQxMeubugEM5UQV0OV6YACmbWqiEZWaIT8Evx7vn6FWZiPaaSrPFR9gAl2Es7/l36IaNkHYM4faEqRJbTEGz+WhkUMZpkzOnVaKINisJ1+GrayKQDfJzU0nZIqI6JeFBjCp7pLStEVG5kjASQzSstC1JOEq1JoYoqVWtiFKOdeAbu5W2lIgeKwkdUO0ysE5kRzmupDyR3TtpxneRJemlWQIZS3uV7GuwydI+LQtdevTDUZpN8AZazS7yf4LhCLxVJBI3KP9M7jxaDYMFH7It4LQ5GGXFL3bkz8jyQTSW21RlUV7xmPCl0AgNHhKJbpEUnkfnfXaBGDEEF6MOPhmWYyWS/IGj9GbGdpT3waUSiHqQ9Gt3hsCcTakiJANR51uUaNZctSYXIJEDspXezPmIJD7DYcjGkMzDfiTfbDdRbds/HUN0AkmfduXV4gLc8ZBcQ3LVdbfWQoauDV4oOffM5hsUI8oVxz74ENH2HA7Sm/lSiP6dBLALvuQ9eyd/AMmszwfKY0z2qJHJJf63ufl4L4G/AgwAv/CVXyLfC0gAAAAASUVORK5CYII=',
                symbolOffset: [0, '-50%']
              },
              {
                type: 'map',
                mapType: this.region,
                geoIndex: 1,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: 'transparent',
                    borderColor: '#afafaf'
                  },
                  emphasis: {
                    label: {
                      show: false
                    },
                    areaColor: 'transparent'
                  }
                },
                data: [
                  {
                    name: '甘孜藏族自治州',
                    value: 2
                  },
                  {
                    name: '乐山市',
                    value: 1
                  }
                ]
              }
            ]
          })
        })
      },
  }
}
</script>

<style lang="scss" scoped>
.des {
  &-banner {
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
    .map {
      position: absolute;
      right: 0;
      bottom: 56px;
      z-index: 9;
      width: 560px;
      height: 480px;
      transition: all .3s linear;
      &:hover {
        transform: scale(1.05)
      }
    }
  }
  &-title {
    position: absolute;
    left: 0;
    bottom: 80px;
    font-size: 46px;
    font-weight: bold;
    color: #fff;
  }
  &-content {
    padding: 100px 0;
    width: 100%;
    overflow: hidden;
    .main {
      position: relative;
    }
    &-box {
      &.active {
        height: auto!important;
      }
      &.hide-ct {
        height: 120px;
      }
    }
    &-more {
      position: absolute;
      bottom: -100px;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, .6), #fff 50%);
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        display: block;
        width: 26px;
        height: 14px;
        background: url('../../assets/images/detail-icon-arrow.png') no-repeat center;
        cursor: pointer;
        box-sizing: content-box;
        transition: all .3s linear;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
  }
}
/deep/ .detail-sec-title {
  margin-bottom: 60px;
  font-size: 30px;
  font-weight: bold;
}
</style>
