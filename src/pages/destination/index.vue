<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- <P>{{$t('index-page-title')}}</P> -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <div class="list-container">
      <div class="detail">
        <div class="detail-top">
          <div class="desc">
            <h3 class="title">Chengdu</h3>
            <p class="mp-40">ChengDu is a wonderful place located in Sichuan province.</p>
            <p>This city is well decorated and designed which attrects lots of tourists every year.</p>
            <p
              class="mp-40"
            >Chengdu has large amounts of tourist spots such as Wangjiang Park,Dujiang Dam and so on.</p>
            <p>
              Such spots are all easy to get and they don't cost much.What'more ,with the rapidly developing
              economy,Chengdu has become an international metropolis.
            </p>
            <p class="mp-40">
              Why not come to this amazing city to get a rest and have a look of these beautiful sceneries.
              Just cherish this hardly-get chance.Don't hestitate.
            </p>
          </div>
          <div class="map-wrapper">
            <div class="map" id="desMap"></div>
          </div>
        </div>
        <div class="detail-bottom">
          <div class="article-wrapper">
            <h3>Recommended tourist attractions</h3>
            <ul>
              <li>
                <span class="img-box">
                  <img src="@/assets/images/index-journey-pic4.jpg" alt />
                </span>
                <h4>Chengdu Panda Base</h4>
              </li>
              <li>
                <span class="img-box">
                  <img src="@/assets/images/index-journey-pic4.jpg" alt />
                </span>
                <h4>Chengdu Panda Base</h4>
              </li>
              <li>
                <span class="img-box">
                  <img src="@/assets/images/index-journey-pic4.jpg" alt />
                </span>
                <h4>Chengdu Panda Base</h4>
              </li>
                <li>
                <span class="img-box">
                  <img src="@/assets/images/index-journey-pic4.jpg" alt />
                </span>
                <h4>Chengdu Panda Base</h4>
              </li>
                <li>
                <span class="img-box">
                  <img src="@/assets/images/index-journey-pic4.jpg" alt />
                </span>
                <h4>Chengdu Panda Base</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- <scroll-load>
        
      </scroll-load>-->
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
// import Ajax from '@/service';
// import axios from 'axios'
// import ScrollLoad from '@/components/scrollLoad'
export default {
  components: {
    Header,
    Footer,
    PageBanner
    // Loading,
    // ScrollLoad
  },
  data() {
    return {
      region: 510000,
      id: Tools.getUrlParams("id"),
      detail: {}
    };
  },
  mounted() {
    this.getDestinationlist()
    // this.getDestinationInfo();
    // this.drawMap();
  },
  methods: {
    // 获取目的地列表
    getDestinationlist () {
      Ajax.getDestinationList({
        region: this.region,
        limitPage: 99
      }).then(res => {
        console.log(res)
      })
    },
    getDestinationInfo() {
      Ajax.getDestinationInfo({
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data;
          this.crumbsLv4 = res.data.regionName;
          let data = [
            [res.data.longitude, res.data.latitude, res.data.regionName]
          ];
          console.log("----");
          console.log(data);
          this.drawMap(data);
          this.$nextTick(() => {
            this.boxHeight = this.$refs.contentBox.offsetHeight;
          });
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
          console.log(list);
          console.log(data);
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
                symbol:
                  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAtCAYAAADGD8lQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDRjVGOTdENUM3NjExRUFCRTUyODYxQkRERDM3MzYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDRjVGOTdFNUM3NjExRUFCRTUyODYxQkRERDM3MzYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUNGNUY5N0I1Qzc2MTFFQUJFNTI4NjFCREREMzczNjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUNGNUY5N0M1Qzc2MTFFQUJFNTI4NjFCREREMzczNjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6RkTofAAADBUlEQVR42sSYS2gTURSGJxNoNVYrWIuP1AeoUZEqig9EXFm3SgVRBMWFoFm5UXTjoigiuNCKGzfqouBKQURcWWkpCKUVbKkRlUrtwypIK7WagI7/gTMwxJnMOXMz4w8fCcm95/4zc++5Z27KcRxLqWawH+wGObAc1PN/U2AUFEAPeMbf5SJDAuaCPBh09OoDJ0GNZKywBilwDIw75voIWk0MNYAnTvX1ACzQGsrxFcWlIbDCb+yUz6TeALpAgxWvxnhhjHh/LDe0BPSCrJWM3oHtYNr9wfb8Sd87EjRDWgvuBi37vPP/dLh8Di0Ew/ypSmPgDfhEjx+s5GSp1ThYDUru3bmkvKIpcAEs9VkpTaANzChjnnaXvQ1GFB1fgEZB1s2CXkXc166hvYpO3aBWuN0Q9eCVIv4mmzdKiWbBEVBUzA1azkfBb2H7FjK0U9j4FiczrQr/LO1g7SJD64WNOwzyjbRvjpY9PYKakIY/QJ2BoVrwS9BuwhaYIU0aZuSid3uooIzNVx+m+YaGbOEd/m6X77YBWgwaDQytA2lBu1Ey1C0MesDAUKuwXRclr0PCpPVBWheXUQcmhWO0WJx5vwk7XI1g6I4w9hhIu53aFen9nNAIpZRririXvTU11bclReenYGMFM1tBpyLeT7dy8Jaw98AJZS30Ejznesjmemgf2Kac9DfB2fKaOss17hwrWc1wKfu5vKamV+DrVvJqc834vXVkwCCXk0noLZ8VlPzeOtyaJ5+QGboTp7xm/AxZfGJxPwFD7X67RCrgOIaOVwZAU0xm3oPN/ESssDvklp6UAv7EYKbEpfBsUFkQpE5wJQZD50Ff1AOrtDLjhukRbymBY6YER3pUC/VX4Z2fku4OPvarWMmF6SvXM0UDM5SND4aZkRqy+IjmjIGh42ComoeeLjcizJuLmjG0hmiSP1aYua0t6KwIFeA80C8w85AvIHZDxDIwXMFMD8hEiR3VELEGfPExUwCLosY1MURsAdMeMxNglUlMU0PEHr4rA6DZNN5fAQYA2acuTjjOMtUAAAAASUVORK5CYII=",
                symbolOffset: [0, "-50%"]
              },
              {
                type: "map",
                mapType: this.region,
                geoIndex: 1,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: "transparent",
                    borderColor: "#d8d8d8"
                  },
                  emphasis: {
                    label: {
                      show: false
                    },
                    areaColor: "transparent"
                  }
                },
                data: [
                  {
                    name: "甘孜藏族自治州",
                    value: 2
                    // selected: true,
                  },
                  {
                    name: "乐山市",
                    value: 2
                  },
                  {
                    name: "阿坝藏族羌族自治州",
                    value: "3",
                    itemStyle: {
                      normal: {
                        areaColor: "#d3a180",
                        borderColor: "#d8d8d8"
                      },
                      emphasis: {
                        label: {
                          show: true
                        },
                        areaColor: "#d3a180"
                      }
                    }
                  }
                ]
              }
            ]
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
  width: 100%;
  min-width: 1360px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .detail {
    // height: 620px;
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
          // transition: all 0.3s linear;
          // &:hover {
          //   transform: scale(1.05);
          // }
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
            .img-box {
              display: block;
              width: 426px;
              height: 280px;
              // background: red;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .img-box:hover img {
              transform: scale(1.1);
            }

            h4 {
              margin-top: 30px;
              font-size: 24px;
              color: #333333;
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
