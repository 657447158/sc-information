<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <page-banner channelCode="sy" :title="$t('destination.pageTit')" />
    <div class="list-container">
      <div class="detail">
        <div class="detail-top">
          <div class="desc">
            <h3 class="title">{{detail.regionName}}</h3>
            <p>{{detail.summary}}</p>
          </div>
          <div class="map-wrapper">
            <div class="map" id="desMap"></div>
          </div>
        </div>
        <div class="detail-bottom">
          <div class="article-wrapper">
            <h3>{{$t('destination.listTit')}}</h3>
            <scroll-load
              requestName="getDestinationScenerys"
              :params="params"
              :limit="6"
              :pFlag="requestState"
              @list="getList"
            >
              <ul slot="list">
                <li 
                  v-for="item in sceneryList"
                  :key="item.id"
                >
                  <a href="">
                    <span class="img-box">
                      <img :src="item.pictureFourToThree" />
                    </span>
                    <h4>{{item.name}}</h4>
                  </a>
                </li>
              </ul>
            </scroll-load>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import Ajax from "@/service";
import Tools from "@/utils/tools.js";
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";
import ScrollLoad from '@/components/scrollLoad'
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    ScrollLoad
  },
  data() {
    return {
      region: 510000,
      city: '',
      id: Tools.getUrlParams("id"),
      detail: {},
      list: [],
      sceneryList: [],
      params: {
        destinationId: ''
      },
      requestState: false
    };
  },
  mounted() {
    this.drawMap()
    this.getDestinationlist()
  },
  methods: {
    getList (list) {
      this.sceneryList = this.sceneryList.concat(list)
    },
    // 获取目的地推荐景区
    getDestinationScenerys () {
      Ajax.getDestinationScenerys({
        destinationId: this.id,
        limitPage: 6
      }).then(res => {
        if (res.code === 0) {
          this.sceneryList = res.datas
        }
      })
    },
    // 获取目的地列表
    getDestinationlist () {
      Ajax.getDestinationList({
        region: this.region,
        limitPage: 99
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas
          this.id = this.id || res.datas[0].id
          this.params.destinationId = this.id
          this.requestState = true
        }
      })
    },
    // 获取目的地详情
    getDestinationInfo(id) {
      Ajax.getDestinationInfo({
        id: id
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data;
          let data = [
            [res.data.longitude, res.data.latitude, res.data.regionName]
          ];
          this.drawMap(data);
        }
      });
    },
    drawMap(list) {
      const myChart = echarts.init(document.getElementById("desMap"));
      axios
        .get(
          `http://filealiyun.geeker.com.cn/ued/map/regionJson/${this.region}.json`
        )
        .then(data => {
          let arr = []
          for (let i = 0; i < this.list.length; i++) {
            for (let j = 0; j < data.data.features.length; j++) {
              if (this.list[i].regionName === data.data.features[j].properties.name) {
                arr.push({
                  id: this.list[i].id,
                  name: this.list[i].regionName
                })
              }
            }
          }
          echarts.registerMap(this.region, data.data);
          myChart.setOption({
            height: "100%",
            geo: {
              map: this.region,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "rgba(0,0,0,0.0)"
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "rgba(255, 255, 255, .6)",
                  borderColor: "#d8d8d8"
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            series: [
              {
                type: "scatter",
                coordinateSystem: "geo",
                data: list,
                symbolSize: [26, 32],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QTBGMjk2NDMyQUUxMUVBQkU0NUUxMjY1MTZBNzQxMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QTBGMjk2NTMyQUUxMUVBQkU0NUUxMjY1MTZBNzQxMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhBMEYyOTYyMzJBRTExRUFCRTQ1RTEyNjUxNkE3NDEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhBMEYyOTYzMzJBRTExRUFCRTQ1RTEyNjUxNkE3NDEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+42qdKAAAAmVJREFUeNqslktIVFEYgO8dDatVpgxiEWURgi6qTQW26wVS4SajohAi3AnlKuwBQUJJQVCLFkEQLYISehAEBlGYLZqgIqRsiPIBgTa2UFNs+v44E8Nwz3/OdeaHj4F7/nu/Oef85xFOnAy0SMA2aIGtsA6Wm7Zx+AT9cB9eVfZks7YPhRZRCAfgDNQHfvEeziLr9RXVwC3YGSwsHkIbwvHCocmP9fC6CInEHhj42RnW2UQr4RmsCooPmcunyJKFojK4CyuC0sVauI0szBe1m6ryiQxMeubugEM5UQV0OV6YACmbWqiEZWaIT8Evx7vn6FWZiPaaSrPFR9gAl2Es7/l36IaNkHYM4faEqRJbTEGz+WhkUMZpkzOnVaKINisJ1+GrayKQDfJzU0nZIqI6JeFBjCp7pLStEVG5kjASQzSstC1JOEq1JoYoqVWtiFKOdeAbu5W2lIgeKwkdUO0ysE5kRzmupDyR3TtpxneRJemlWQIZS3uV7GuwydI+LQtdevTDUZpN8AZazS7yf4LhCLxVJBI3KP9M7jxaDYMFH7It4LQ5GGXFL3bkz8jyQTSW21RlUV7xmPCl0AgNHhKJbpEUnkfnfXaBGDEEF6MOPhmWYyWS/IGj9GbGdpT3waUSiHqQ9Gt3hsCcTakiJANR51uUaNZctSYXIJEDspXezPmIJD7DYcjGkMzDfiTfbDdRbds/HUN0AkmfduXV4gLc8ZBcQ3LVdbfWQoauDV4oOffM5hsUI8oVxz74ENH2HA7Sm/lSiP6dBLALvuQ9eyd/AMmszwfKY0z2qJHJJf63ufl4L4G/AgwAv/CVXyLfC0gAAAAASUVORK5CYII=',
                symbolOffset: [0, "-30%"]
              },
              {
                type: 'map',
                tooltip: {
                  show: false
                },
                mapType: this.region,
                geoIndex: 1,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#fff',
                    borderColor: '#afafaf'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      color: '#f77800',
                      textStyle: {
                        color: '#f77800'
                      }
                    },
                    borderColor: '#f77800',
                    areaColor: '#fff'
                  }
                },
                data: arr
              }
            ]
          });
          myChart.on('click', function (params) {
            if (params.data) {
              window.location.href = `destination.html?code=destination&id=${params.data.id}`
            }
          })
        });
    }
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.mp-40 {
  margin-top: 40px;
}
.list-container {
  width: 100%;
  min-width: 1360px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .detail {
    width: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .detail-top {
      width: 1360px;
      min-height: 620px;
      display: flex;
      justify-content: space-between;
      .desc {
        width: 680px;
        .title {
          position: relative;
          font-size: 46px;
          padding-top: 112px;
          padding-bottom: 42px;
          font-weight: bold;
          color: #333333;
          &:after {
            position: absolute;
            content: "";
            width: 60px;
            height: 4px;
            left: 0px;
            bottom: 0px;
            background: #999999;
          }
        }
        p {
          font-size: 16px;
          line-height: 24px;
          color: #666666;
        }
      }
      .map-wrapper {
        width: 660px;
        display: flex;
        align-items: center;
        .map {
          width: 610px;
          height: 520px;
        }
      }
    }
    .detail-bottom {
      width: 100%;
      min-height: 100px;
      display: flex;
      justify-content: center;
      background: #ffffff;
      .article-wrapper {
        width: 1360px;
        min-height: 200px;
        h3 {
          font-size: 46px;
          font-weight: bold;
          // width: 1360px;
          color: #333333;
          margin-top: 120px;
          margin-bottom: 80px;
        }
        ul {
          width: 1360px;
          min-width: 1360px;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 426px;
            margin-left: 41px;
            margin-bottom: 60px;
            a {
              display: block;
              width: 100%;
              height: 100%;
            }
            .img-box {
              display: block;
              width: 426px;
              height: 280px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            &:hover {
              img {
                transform: scale(1.1);
              }
              h4 {
                color: $themeColor;
              }
            }
            h4 {
              margin-top: 30px;
              font-size: 24px;
              color: #333333;
              font-weight: normal;
              @include ellipsis();
              transition: all .3s linear;
            }
          }
          li:nth-child(3n+1) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
