<template>
  <div class="des-info">
		<div class="main">
      <div class="left">
        <p class="big">四川</p>
        <p>面积<span class="big num">48.6</span>万平方公里</p>
        <p>辖<span class="big num">21</span>个市（州）</p>
        <p><span class="big num1">183</span>个县（市、区）</p>
        <p>每个地方都各具特色，且彼此相距不远，你在有限的假期里可以多多游玩</p>
      </div>
      <div class="map" id="desMap"></div>
      <img class="compass" src="@/assets/images/compass.png" />
		</div>
	</div>
</template>
<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import Ajax from '@/service'
  export default {
    data () {
      return {
        region: 510000
      }
    },
    mounted () {
      this.getDestinationRegionAndScenery()
    },
    methods: {
      drawMap (datas) {
        const myChart = echarts.init(document.getElementById('desMap'))
        axios.get(`http://filealiyun.geeker.com.cn/ued/map/regionJson/${this.region}.json`)
          .then(data => {
            echarts.registerMap(this.region, data.data)
            myChart.setOption({
              width: '56.6%',
              height: '80%',
              tooltip: {
                show: true,
                trigger: 'item',
                backgroundColor: '#fff',
                textStyle: {
                  color: '#333'
                },
                extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); padding: 0;',
                formatter: function (params) {
                  let children = params.data.child
                  let liTmps = ''
                  let label = ''
                  for (let i = 0; i < children.length; i++) {
                    label = `<span class="label" style="margin-right: 12px;">${children[i].name}</span>`
                    let scenery = ''
                    for (let j = 0; j < children[i].sceneryList.length; j++) {
                      // scenery += `<span style="margin-left: 12px; color: #999; max-width: 20%; overflow: hidden; white-space: nowrap; word-wrap: normal; text-overflow: ellipsis;">${children[i].sceneryList[j].name}</span>`
                      scenery += `<span style="margin-left: 12px; color: #999;">${children[i].sceneryList[j].name}</span>`
                    }
                    liTmps += `<li style="padding: 0 16px; margin-bottom: 12px; display: flex; align-altems: center; height: 20px; overflow: hidden;">${label}<div style="display: flex; width: 290px; overflow: hidden;">${scenery}</div></li>`
                  }
                  let tmp = `<div style="max-width: 380px; overflow: hidden;"><p style="padding: 16px; font-size: 16px; font-weight: bold; color: #666; border-bottom: 1px solid #ebebeb;">${params.data.name}</p><ul style="padding: 16px 0 0;">${liTmps}</ul></div>`
                  return tmp
                }
              },
              geo: {
                map: this.region,
                left: 'auto',
                right: 60,
                bottom: 'auto',
                top: 80,
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
                    areaColor: 'rgba(255, 255, 255, .8)',
                    borderColor: '#fff'
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
                  type: 'map',
                  left: 'auto',
                  right: 60,
                  bottom: 'auto',
                  top: 80,
                  mapType: this.region,
                  geoIndex: 1,
                  label: {
                    normal: {
                      show: true,
                      color: '#999'
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  itemStyle: {
                    normal: {
                      areaColor: 'transparent',
                      borderColor: '#afafaf'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        color: '#fff',
                        textStyle: {
                          color: '#fff'
                        }
                      },
                      areaColor: '#f77800'
                    }
                  },
                  data: datas
                }
              ]
            })
          })
        myChart.on('click', function (params) {
          if (params.data && params.data.mapGuideSetId) {
            window.location.href = `destination-detail.html?code=destination&id=${params.data.mapGuideSetId}`
          }
        })
      },
      getDestinationRegionAndScenery () {
        Ajax.getDestinationRegionAndScenery({
          region: this.region
        }).then(res => {
          let arr = res.datas
          if (res.code === 0 && arr.length) {
            for (let i = 0; i < arr.length; i++) {
              arr[i].child = arr[i].child.slice(0, 5)
            }
            this.drawMap(arr)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.des-info {
  width: 100%;
  height: 820px;
  background: url('../../../assets/images/des-map-bg.jpg') no-repeat center;
}
.des-info .main {
  position: relative;
}
.des-info .left {
  position: absolute;
  top: 290px;
  left: 40px;
  color: #666;
  font-size: 16px;
}
.des-info .left .big {
  font-size: 30px;
  &.num {
    margin: 0 10px;
  }
  &.num1 {
    margin-right: 10px;
  }
}
.des-info .left p {
  margin-bottom: 30px;
}
.des-info .map {
  width: 100%;
  height: 820px;
}
.des-info .compass {
  position: absolute;
  bottom: 78px;
  right: 50px;
}
</style>
