<template>
  <div class="nav daq-nav" :class="scrollFlag && 'active'">
		<div class="main">
			<a class="hide-ball" href="index.html">
        <img class="nav-logo" src="@/assets/images/logo.png" alt="四川省文化和旅游局" />
      </a>
			<ul class="nav-list">
				<!-- <li :class="(code === 'index' || !code) && 'active'"><a class="hide-ball" href="index.html">首页</a></li> -->
				<li :class="code === 'destination' && 'active'">
					<a class="hide-ball" href="destination.html?code=destination">Destination</a>
				</li>
				<li :class="code === 'next' && 'active'">
					<a class="hide-ball" href="next.html?code=next">Theme ravel</a>
					<div class="nav-down">
						<div class="main">
							<div class="nav-next-left">
								<a href="next-list.html?code=next&channelCode=zrfg">
									<img src="@/assets/images/nav-down-next-pic1.jpg" />
									<span>自然风光</span>
								</a>
								<a href="next-list.html?code=next&channelCode=mlrw">
									<img src="@/assets/images/nav-down-next-pic2.jpg" />
									<span>魅力人文</span>
								</a>
								<a href="next-list.html?code=next&channelCode=xxty">
									<img src="@/assets/images/nav-down-next-pic3.jpg" />
									<span>休闲体验</span>
								</a>
								<a href="next-list.html?code=next&channelCode=jrkh">
									<img src="@/assets/images/nav-down-next-pic4.jpg" />
									<span>假日狂欢</span>
								</a>
								<a href="next-list.html?code=next&channelCode=jdcq">
									<img src="@/assets/images/nav-down-next-pic5.jpg" />
									<span>经典传奇</span>
								</a>
								<a href="next-list.html?code=next&channelCode=tflymx">
									<img src="@/assets/images/nav-down-next-pic6.jpg" />
									<span>天府旅游名县</span>
								</a>
							</div>
							<div class="nav-down-right next-right">
								<p class="p1">下一站，出发</p>
								<p class="p2">期待您的到来....</p>
								<p class="p2">了解您在四川可体验的一起。</p>
							</div>
						</div>
					</div>
				</li>
				<li :class="code === 'info' && 'active'">
					<a class="hide-ball" href="info.html?code=info">Practical information</a>
					<div class="nav-down">
						<div class="main">
							<div class="nav-info-left">
								<ul>
									<li><a href="channel-detail.html?code=info&channelCode=aqbz">安全保障</a></li>
									<li><a href="channel-detail.html?code=info&channelCode=yjss">硬件设施</a></li>
									<li><a href="channel-detail.html?code=info&channelCode=lyxts">旅游小贴士</a></li>
								</ul>
								<ul>
									<li><a href="traffic-guide.html?code=info">交通指南</a></li>
									<li><a href="hotel-list.html?code=info">酒店住宿</a></li>
									<li><a href="guide-list.html?code=info">导游查询</a></li>
									<li><a href="travel-agency.html?code=info">旅行社查询</a></li>
								</ul>
								<ul>
									<li><a href="news-list.html?code=info&channelCode=whfw">文化服务</a></li>
									<li><a href="news-list.html?code=info&channelCode=zdwyhdyzyb">重点文艺活动一周预报</a></li>
								</ul>
							</div>
							<div class="nav-down-right info-right">
								<p class="p1">实用信息</p>
								<p class="p2">无微不至的贴心关怀，为你的</p>
								<p class="p2">出行保驾护航。</p>
							</div>
						</div>
					</div>
				</li>
				<li :class="code === 'activity' && 'active'"><a class="hide-ball" href="hot-activity.html?code=activity">热门活动</a></li>
				<!-- 搜索 -->
				<li class="nav-search" @click="showSearchModal">
          <span class="daq-icon hide-ball">&#xe673;</span>
        </li>
				<!-- 语言选择 -->
				<li class="nav-lang">
					<span class="daq-icon hide-ball">&#xe677;</span>
					<div class="nav-down">
						<div class="main">
							<ul class="nav-down-lang-list">
								<!-- <li class="area">Europe</li> -->
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-france.jpg" />
										<span>France - Français</span>
									</a>
								</li>
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-germany.jpg" />
										<span>Germany - Deutsch</span>
									</a>
								</li>
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-spain.jpg" />
										<span>Spain - Español</span>
									</a>
								</li>
							</ul>
							<ul class="nav-down-lang-list">
								<!-- <li class="area">Asia Pacific</li> -->
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-china.jpg" />
										<span>China - 简体中文</span>
									</a>
								</li>
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-japan.jpg" />
										<span>Japan - 日本語</span>
									</a>
							</li>
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-korea.jpg" />
										<span>South Korea - 대한민국</span>
									</a>
								</li>
							</ul>
							<ul class="nav-down-lang-list">
								<!-- <li class="area">All other countries</li> -->
								<li>
									<a href="">
										<img src="@/assets/images/nav-lang-coutry-en.jpg" />
										<span>Global - English</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- 搜索下拉 -->
		<div class="nav-search-down" :class="showModal && 'active'">
			<span class="close" @click="hideSearchModal"></span>
			<div class="center">
				<img src="@/assets/images/nav-search-logo.png" />
				<div class="input-box">
					<input
            type="text"
            v-model="keyword"
            placeholder="请输入你想要搜索的关键字"
            @keyup.enter="goSearch"
          >
					<span class="search-btn daq-icon" @click="goSearch">&#xe673;</span>
				</div>
			</div>
		</div>
    <!-- 第一次进入加载动画 -->
    <transition name="fade">
      <div class="page-load" v-if="initPage">
        <img src="@/assets/images/page-load-logo.gif" />
        <div class="words">
          <span style="animation-delay: 0s">天</span>
          <span style="animation-delay: .2s">府</span>
          <span style="animation-delay: .4s">三</span>
          <span style="animation-delay: .6s">九</span>
          <span style="animation-delay: .8s">大</span>
          <span style="animation-delay: 1s">·</span>
          <span style="animation-delay: 1.2s">安</span>
          <span style="animation-delay: 1.4s">逸</span>
          <span style="animation-delay: 1.6s">走</span>
          <span style="animation-delay: 1.8s">四</span>
          <span style="animation-delay: 2s">川</span>
        </div>
        <p class="loading">加载中...</p>
      </div>
    </transition>
    <!-- top按钮 -->
    <div class="go-top" :class="showTopBtn && 'active'" @click="goTop"></div>
	</div>
</template>
<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import Ajax from '@/service'
  export default {
    data () {
      return {
        initPage: sessionStorage.getItem('scInit') ? false : true,
        code: '',
        scrollFlag: false,
        ticking: false,
        showModal: false,
        showTopBtn: false,
        region: 510000,
        keyword: ''
      }
    },
    created () {
      if (this.initPage) {
        setTimeout(() => {
          this.initPage = false
          sessionStorage.setItem('scInit', 'false')
        }, 5000)
      }
    },
    mounted () {
      // 低于1366 跳转移动端
      if (screen.width <= 1366) {
        window.location.href = 'http://test.tsichuan.com/zxw/mobile/#/index'
      }
      // let regions = localStorage.getItem('scRegions')
      let regions = sessionStorage.getItem('scRegions')
      if (regions) {
        this.drawMap(JSON.parse(regions))
      } else {
        this.getDestinationList()
      }
      window.addEventListener('scroll', this.onScroll, false)
      let params = window.location.search
      let arr = params ? params.slice(1).split('&') : []
      arr.map(item => {
        let p = item.split('=')[0]
        let v = item.split('=')[1]
        if (p === 'code') {
          this.code = v
        }
      })
    },
    methods: {
      goSearch () {
        if (!this.keyword) return
        window.location.href = `search.html?keyword=${encodeURI(this.keyword)}`
      },
      showSearchModal () {
        this.showModal = true
      },
      hideSearchModal () {
        this.showModal = false
        this.keyword = ''
      },
      onScroll () {
        if(!this.ticking) {
          requestAnimationFrame(this.scrollHandle)
          this.ticking = true
        }
      },
      scrollHandle () {
        const scrollTop = document.documentElement.scrollTop
        if (scrollTop > 100) {
          this.scrollFlag = true
          this.showTopBtn = true
        } else {
          this.scrollFlag = false
          this.showTopBtn = false
        }
        this.ticking = false
      },
      getDestinationList () {
        Ajax.getDestinationList({
          region: this.region,
          limitPage: 99
        }).then(res => {
          if (res.code === 0) {
            // localStorage.setItem('scRegions', JSON.stringify(res.datas))
            sessionStorage.setItem('scRegions', JSON.stringify(res.datas))
            this.drawMap(res.datas)
          }
        })
      },
      drawMap (list) {
        const myChart = echarts.init(document.getElementById('map'))
        axios.get(`http://filealiyun.geeker.com.cn/ued/map/regionJson/${this.region}.json`)
          .then(data => {
            let arr = []
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < data.data.features.length; j++) {
                if (list[i].regionName === data.data.features[j].properties.name) {
                  arr.push({
                    id: list[i].id,
                    name: list[i].regionName
                  })
                }
              }
            }
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
            })
          })
        myChart.on('click', function (params) {
          if (params.data) {
            window.location.href = `destination-detail.html?code=destination&id=${params.data.id}`
          }
        })
      },
      step () {
        const distance = document.body.scrollTop || document.documentElement.scrollTop
        const v = distance / 10
        document.documentElement.scrollTop = distance - v
        if (distance > 0) {
          window.requestAnimationFrame(this.step)
        }
      },
      goTop () {
        window.requestAnimationFrame(this.step)
      }
    }
  }
</script>
<style lang="scss" scoped>
.go-top {
  position: fixed;
  bottom: 60px;
  right: -52px;
  z-index: 99;
  width: 50px;
  height: 50px;
  background: #b2b2b2 url('../assets/images/go-top-btn.png') no-repeat center;
  cursor: pointer;
  transition: all .3s linear;
  &:hover {
    background: #f77800 url('../assets/images/go-top-btn.png') no-repeat center;
  }
  &.active {
    right: 60px;
  }
}
.page-load {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
  img {
    height: 154px;
  }
  .words {
    display: flex;
    margin-top: 10px;
    font-size: 24px;
    color: #160d0c;
    span {
      animation: upAndDown 2.6s linear infinite;
    }
  }
  .loading {
    display: flex;
    margin-top: 26px;
    font-size: 18px;
    color: $themeColor;
  }
}
@keyframes upAndDown {
  0% {
    transform: translateY(0)
  }
  10% {
    transform: translateY(-80%)
  }
  20% {
    transform: translateY(0)
  }
  100% {}
}
.daq-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 120px;
  background: #fff;
  transition: all .5s linear;
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}
.nav-logo {
  margin-top: 27px;
  float: left;
  transition: all .5s linear;
  transform-origin: 0 0;
}
.daq-nav .main {
  height: 100%;
}
.nav-list {
  padding-top: 54px;
  float: right;
  height: 100%;
  overflow: hidden;
  transition: all .5s linear;
}
.nav-list>li {
  padding: 0 27px;
  height: 100%;
  float: left;
  font-size: 20px;
}
.nav-list>li a {
  transition: all .3s linear;
}
.nav-list>li:hover>a,
.nav-list>li.active>a
{
  color: $themeColor;
  // font-weight: bold;
}
.nav-list>li:hover .nav-down {
  transform: rotateX(0);
  opacity: 1;
  visibility: visible;
}
.nav-list .nav-search {
  margin-left: 40px;
  padding: 0;
}
.nav-list .nav-search .daq-icon {
  display: block;
  font-size: 36px;
  line-height: 24px;
  color: #333;
  cursor: pointer;
  transition: all .3s linear;
}
.nav-list .nav-lang {
  margin-left: 50px;
  padding: 0;
}
.nav-list .nav-lang .daq-icon {
  display: block;
  font-size: 30px;
  line-height: 24px;
  color:#333;
  cursor: pointer;
  transition: all .3s linear;
}
.nav-list .nav-lang:hover .daq-icon,
.nav-list .nav-search:hover .daq-icon
{
  color: $themeColor;
}
.nav-down {
  position: absolute;
  left: 0;
  top: 120px;
  width: 100%;
  height: 460px;
  background: rgba(255, 255, 255, .96);
  transition: all .5s linear;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: all .6s linear;
  transform: rotateX(90deg);
  transform-origin: 50% 0;
}
.nav-down .echarts-map {
  margin-top: 50px;
  float: left;
  width: 420px;
  height: 360px;
}
.nav-down-right {
  position: relative;
  margin-top: 140px;
  padding: 56px 0 0 30px;
  float: right;
  width: 490px;
  height: 200px;
  color: #fff;
  background: $themeColor;
  border-radius: 0 40px 0 40px;
}
.nav-down-right::after {
  content: '';
  position: absolute;
  display: block;
}
.des-right::after {
  top: -54px;
  right: 45px;
  width: 204px;
  height: 300px;
  background: url('../assets/images/nav-dow-des-logo.png') no-repeat;
}
.next-right::after {
  top: -47px;
  right: -44px;
  width: 305px;
  height: 300px;
  background: url('../assets/images/nav-dow-next-logo.png') no-repeat;
}
.info-right::after {
  top: -58px;
  right: 6px;
  width: 298px;
  height: 300px;
  background: url('../assets/images/nav-dow-info-logo.png') no-repeat;
}
.nav-down-right .p1 {
  margin-bottom: 16px;
  font-size: 30px;
  font-weight: bold;
}
.nav-down-right .p2 {
  width: 210px;
  font-size: 14px;
  line-height: 1.5;
}
.nav-down .nav-next-left {
  margin-top: 90px;
  float: left;
  width: 720px;
  overflow: hidden;
}
.nav-down .nav-next-left a {
  position: relative;
  float: left;
  margin: 0 0 40px 40px;
  display: block;
  width: 200px;
  height: 120px;
  background: #999;
  overflow: hidden;
}
.nav-down .nav-next-left a:hover img {
  transform: scale(1.1);
}
.nav-down .nav-next-left span {
  position: absolute;
  bottom: 20px;
  left: 0;
  display: block;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.nav-down .nav-info-left {
  padding-left: 54px;
  float: left;
}
.nav-down .nav-info-left ul {
  padding-top: 140px;
  float: left;
}
.nav-down .nav-info-left ul~ul {
  margin-left: 160px;
}
.nav-down .nav-info-left li {
  margin-bottom: 40px;
  padding: 0;
  float: none;
}
.nav-down .nav-info-left li a {
  font-size: 18px;
  font-weight: bold;
  color: #666;
}
.nav-down .nav-info-left li a:hover {
  color: $themeColor;
}
.nav-down-lang-list {
  margin-left: 200px;
  padding-top: 100px;
  float: left;
}
.nav-down-lang-list li {
  margin-bottom: 20px;
}
.nav-down-lang-list .area {
  margin-bottom: 32px;
  font-size: 20px;
}
.nav-down-lang-list a {
  font-size: 16px;
  color: #666;
}
.nav-down-lang-list a:hover {
  color: $themeColor;
}
.nav-down-lang-list img {
  display: inline-block;
  vertical-align: middle;
}
.nav-down-lang-list span {
  margin-left: 12px;
  display: inline-block;
  vertical-align: middle;
}

.daq-nav.active {
  height: 60px;
}
.daq-nav.active .nav-logo {
  margin-top: 9px;
  transform: scale(.6);
}
.daq-nav.active .nav-list {
  padding-top: 18px;
}
.daq-nav.active .nav-down {
  top: 60px;
}

.nav-search-down {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .9);
  transform: translateX(-100%);
  transition: all .3s linear;
}
.nav-search-down.active {
  transform: translateX(0);
}
.nav-search-down .close {
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  width: 26px;
  height: 27px;
  background: url('../assets/images/nav-search-down-close.png') no-repeat;
  transition: all .3s linear;
  cursor: pointer;
}
.nav-search-down .close:hover {
  transform: rotate(180deg);
}
.nav-search-down .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nav-search-down .center img {
  display: block;
  margin: 0 auto;
}
.nav-search-down .input-box {
  margin-top: 60px;
  overflow: hidden;
}
.nav-search-down input {
  padding: 0 20px;
  float: left;
  display: block;
  width: 680px;
  height: 60px;
  background: #fff;
  border: none;
  outline: none;
}
.nav-search-down input::placeholder {
  color: #999;
}
.nav-search-down .search-btn {
  float: left;
  margin-left: 20px;
  float: left;
  display: block;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  background: $themeColor;
  cursor: pointer;
  transition: all .3s linear;
  &:hover {
    background: $themeColorOpa;
  }
}
</style>
