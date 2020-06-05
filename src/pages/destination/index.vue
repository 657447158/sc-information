<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="list-container">
      <div class="detail">
        <div class="detail-top">
          <div class="desc">
            <!-- <h3 class="title" v-if="fisrtFlag">{{detail.metaTitle}}</h3> -->
            <h3 class="title">{{detail.metaTitle || detail.name}}</h3>
            <div v-html="detail.content"></div>
          </div>
          <div class="map-wrapper">
            <div class="map" id="desMap"></div>
            <span class="compass">
              <img src="@/assets/images/cpmpass@3x.png" />
            </span>
          </div>
        </div>
        <div class="detail-bottom" v-if="fisrtFlag">
          <div class="article-wrapper">
            <h3>{{$t('destination.listTit')}}</h3>
            <ul>
              <li v-for="item in list" :key="item.id">
                <a :href="`list.html?code=${item.channelCode}`">
                  <span class="img-box">
                    <img v-if="item.channelImage" :src="item.channelImage" />
                  </span>
                  <h4>{{item.name}}</h4>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-bottom" v-else>
          <div class="article-wrapper">
            <h3>{{$t('destination.listTit2')}}</h3>
            <scroll-load
              requestName="getNewsList"
              :params="params"
              :limit="6"
              :pFlag="requestState"
              @list="getList"
            >
              <ul slot="list">
                <li v-for="item in slist" :key="item.id">
                  <a :href="`article-detail.html?id=${item.id}`">
                    <span class="img-box">
                      <img v-if="item.cover" :src="item.cover" />
                    </span>
                    <h4>{{item.title}}</h4>
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
import ScrollLoad from "@/components/scrollLoad";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import lang from "@/languages";
const NODE_ENV = process.env.NODE_ENV;
const region = 510000
export default {
  components: {
    Header,
    Footer,
    ScrollLoad
  },
  data() {
    return {
      region,
      city: "",
      channelCode: Tools.getUrlParams("channelCode"),
      detail: {},
      list: [],
      slist: [],
      params: {
        channelCode: ""
      },
      requestState: false,
      cities: lang[NODE_ENV].destination.cities,
      // 第一次进入
      fisrtFlag: true,
      timeInterval: null,
      cityIndex: '',
      myChart: null,
      mapOptions: {
        height: "100%",
        geo: {
          map: region,
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
            type: "map",
            tooltip: {
              show: false
            },
            mapType: region,
            geoIndex: 1,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#fff",
                borderColor: "#afafaf"
              },
              emphasis: {
                label: {
                  show: true,
                  color: "#fff",
                  textStyle: {
                    color: "#fff"
                  },
                  formatter: function(params) {
                    return params.data ? params.data.foreignName : "";
                  }
                },
                borderColor: "#f77800",
                areaColor: "#f77800"
              }
            },
            data: lang[NODE_ENV].destination.cities
          }
        ]
      }
    };
  },
  mounted() {
    this.drawMap();
    this.getChannelList();
    // this.setIntervalHandle();
  },
  methods: {
    setIntervalHandle () {
      this.timeInterval = setInterval(() => {
        if (this.cityIndex < this.cities.length) {
          this.cityIndex++
        }
        if (this.cityIndex === this.cities.length) {
          this.cityIndex = 0
        }
        this.cities.map((item, index) => {
          item.selected = false
          if (this.cityIndex === index) {
            item.selected = true
          }
        })
        this.mapOptions.series[0].data = this.cities
        this.myChart.setOption(this.mapOptions)
      }, 5000);
    },
    getList(val) {
      this.slist = this.slist.concat(val);
    },
    // 获取目的地列表(栏目)
    getChannelList() {
      Ajax.getChannelList({
        channelCode: "mdd",
        limitPage: 99
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas;
          this.getChannelDetail("mdd");
        }
      });
    },
    // 获取目的地详情
    getChannelDetail(channelCode) {
      Ajax.getChannelDetail({
        channelCode
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },
    drawMap() {
      const _this = this;
      this.myChart = echarts.init(document.getElementById("desMap"));
      axios
        .get(
          `http://filealiyun.geeker.com.cn/ued/map/regionJson/${this.region}.json`
        )
        .then(data => {
          echarts.registerMap(this.region, data.data);
          this.myChart.setOption(this.mapOptions);
          this.myChart.on("click", function(params) {
            if (params.data) {
              _this.cities.map(item => {
                item.selected = false
                if (params.data.channelCode === item.channelCode) {
                  item.selected = true
                }
              })
              console.log('_this.cities', _this.cities);
              // window.clearInterval(this.timeInterval)
              _this.mapOptions.series[0].data = _this.cities
              _this.myChart.setOption(_this.mapOptions)
              // _this.setIntervalHandle()
              _this.fisrtFlag = false;
              _this.requestState = true;
              _this.channelCode = params.data.channelCode;
              _this.params.channelCode = _this.channelCode;
              _this.getChannelDetail(_this.channelCode);
              // window.location.href = `destination.html?code=destination&channelCode=${params.data.channelCode}`
            }
          });
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
  padding-top: 100px;
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
          margin-bottom: 32px;
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
        // p {
        //   font-size: 16px;
        //   line-height: 24px;
        //   color: #666666;
        // }
      }
      .map-wrapper {
        width: 660px;
        display: flex;
        align-items: center;
        position: relative;
        .compass {
          position: absolute;
          right: 0;
          bottom: 60px;
          width: 84px;
          height: 84px;
          img {
            width: 100%;
            height: 100%;
          }
        }
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
              transition: all 0.3s linear;
              // line-height: 1.2;
            }
          }
          li:nth-child(3n + 1) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
