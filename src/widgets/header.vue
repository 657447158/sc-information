<template>
  <div class="nav daq-nav" :class="scrollFlag && 'active'">
		<div class="main">
			<a href="index.html">
        <img class="nav-logo" src="@/assets/images/logo.png" alt="四川省文化和旅游局" />
      </a>
			<ul class="nav-list">
        <!-- 目的地 -->
				<li :class="code === 'destination' && 'active'">
					<a href="destination.html?code=destination">{{$t('header.nav[0]')}}</a>
				</li>
        <!-- 主题旅游 -->
				<li :class="code === 'recommend' && 'active'">
					<a href="recommend.html?code=recommend">
            <span>{{$t('header.nav[1]')}}</span>
            <span class="daq-icon">&#xe6af;</span>
          </a>
					<div class="nav-down">
						<div class="main">
							<ul class="nav-down-theme">
                <li
                  class="nav-down-theme-item"
                  v-for="item in themeTravelList"
                  :key="item.id"
                >
                  <a :href="`list-menu.html?code=${item.channelCode}`">
                    <span class="img-box">
                      <img :src="item.channelImage" />
                    </span>
                    <p>{{item.name}}</p>
                  </a>
                </li>
              </ul>
						</div>
					</div>
				</li>
        <!-- 适用信息 -->
				<li :class="code === 'info' && 'active'">
					<a href="service.html?code=info">
            <span>{{$t('header.nav[2]')}}</span>
            <span class="daq-icon">&#xe6af;</span>
          </a>
					<div class="nav-down">
						<div class="main">
							<ul class="nav-down-info">
                <li 
                  class="nav-down-info-item"
                  v-for="item in informationList"
                  :key="item.id"
                >
                  <a :href="`channel-detail.html?code=${item.channelCode}`">
                    <span class="daq-icon" v-html="item.metaDescription"></span>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </ul>
						</div>
					</div>
				</li>
				<!-- 搜索 -->
				<li class="nav-search">
          <div class="nav-search-box">
            <input type="text" :placeholder="$t('header.nav[3]')" v-model="keywords" @keyup.enter="search">
            <a class="daq-icon" :href="`search.html?keywords=${keywords}`">&#xe673;</a>
          </div>
        </li>
				<!-- 语言选择 -->
				<li class="nav-lang">
					<span class="daq-icon">&#xe677;</span>
					<div class="nav-down">
						<div class="main">
							<ul class="nav-down-lang-list">
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
    <!-- 第一次进入加载动画 -->
    <transition name="fade">
      <div class="page-load" v-if="initPage">
        <img src="@/assets/images/page-load-logo.gif" />
        <p class="loading">LOADING...</p>
      </div>
    </transition>
    <!-- top按钮 -->
    <div class="go-top" :class="showTopBtn && 'active'" @click="goTop"></div>
	</div>
</template>
<script>
  import Ajax from '@/service'
  export default {
    data () {
      return {
        initPage: sessionStorage.getItem('scInit') ? false : true,
        code: '',
        scrollFlag: false,
        ticking: false,
        showTopBtn: false,
        themeTravelList: [],
        informationList: [],
        keywords: ''
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
      if (!sessionStorage.getItem('themeTravelList')) {
        this.getChannelCodeByThemeTravel()
      } else {
        this.themeTravelList = JSON.parse(sessionStorage.getItem('themeTravelList'))
      }
      if (!sessionStorage.getItem('informationList')) {
        this.getChannelCodeByInformation()
      } else {
        this.informationList = JSON.parse(sessionStorage.getItem('informationList'))
      }
      // 低于1366 跳转移动端
      if (screen.width <= 1366) {
        window.location.href = 'http://test.tsichuan.com/zxw/mobile/#/index'
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
      // 获取主题旅游栏目下的子栏目
      getChannelCodeByThemeTravel () {
        Ajax.getChannelList({
          channelCode: 'ztlytj'
        }).then(res => {
          if (res.code === 0) {
            this.themeTravelList = res.datas
            sessionStorage.setItem('themeTravelList', JSON.stringify(res.datas))
          }
        })
      },
      // 获取实用信息下的子栏目
      getChannelCodeByInformation () {
        Ajax.getChannelList({
          channelCode: 'syxx'
        }).then(res => {
          if (res.code === 0) {
            this.informationList = res.datas
            sessionStorage.setItem('informationList', JSON.stringify(res.datas))
          }
        })
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
      },
      search () {
        window.location.href = `search.html?keywords=${this.keywords}`
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
  .loading {
    display: flex;
    margin-top: 26px;
    font-size: 18px;
    color: $themeColor;
  }
}
.daq-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100px;
  background: #fff;
  transition: all .5s linear;
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}
.nav-logo {
  margin-top: 20px;
  float: left;
  transition: all .5s linear;
  transform-origin: 0 0;
}
.daq-nav .main {
  height: 100%;
}
.nav-list {
  padding-top: 32px;
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  transition: all .5s linear;
  .daq-icon {
    margin-left: 12px;
    font-size: 12px;
    transition: all .3s linear;
  }
}
.nav-list>li {
  padding: 0 30px;
  height: 100%;
  float: left;
  font-size: 22px;
}
.nav-list>li a {
  margin-top: 4px;
  display: flex;
  align-items: center;
  transition: all .3s linear;
}
.nav-list>li:hover>a,
.nav-list>li.active>a
{
  color: $themeColor;
  .daq-icon {
    color: $themeColor;
    transform: rotate(180deg);
  }
}
.nav-list>li:hover .nav-down {
  transform: rotateX(0);
  opacity: 1;
  visibility: visible;
}
.nav-list .nav-search {
  margin-left: 30px;
  padding: 0;
  &-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    border: 1px solid #666;
    border-radius: 17px;
  }
  input {
    width: 110px;
    border: none;
    outline: none;
    font-size: 16px;
    transition: all .2s linear;
    &:hover {
      width: 200px;
    }
    &:focus {
      width: 200px;
    }
  }
}
.nav-list .nav-search .daq-icon {
  font-size: 24px;
  color: #333;
  cursor: pointer;
  transition: all .3s linear;
}
.nav-list .nav-lang {
  margin: 10px 0 0 50px;
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
  top: 100px;
  width: 100%;
  height: 280px;
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
.nav-down-lang-list {
  margin-left: 200px;
  padding-top: 60px;
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
  padding-top: 14px;
}
.daq-nav.active .nav-down {
  top: 60px;
}
.nav-down-theme {
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
  &-item {
    font-size: 16px;
    a {
      display: flex;
      flex-direction: column;
      color: #666;
    }
    .img-box {
      margin-bottom: 20px;
      display: block;
      width: 200px;
      height: 120px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.nav-down-info {
  margin-top: 98px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &-item {
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 16px;
      color: #666;
    }
  }
  .daq-icon {
    margin: 0 0 30px 0;
    color: #333;
    font-size: 50px;
    text-align: center;
  }
}
</style>
