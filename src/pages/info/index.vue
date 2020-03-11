<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 二级页面banner -->
    <page-banner title="实用信息" />
    <div class="info-sec info-sec1 animate-box">
      <div class="main">
        <ul class="info-sec1-list">
          <li class="info-sec1-item animate-item" style="animation-delay: 0s;">
            <a href="channel-detail.html?code=info&channelCode=lyxts">
              <span class="img-box">
                <img src="@/assets/images/info-pic-1.jpg" />
              </span>
              <p class="title">旅游小贴士</p>
              <p class="slogan">我们相信，只要游客满意，他们将再次光临，特此为您奉上最佳旅行贴士，愿您拥有美好的旅程</p>
            </a>
          </li>
          <li class="info-sec1-item animate-item" style="animation-delay: .1s;">
            <a href="channel-detail.html?code=info&channelCode=aqbz">
              <span class="img-box">
                <img src="@/assets/images/info-pic-2.jpg" />
              </span>
              <p class="title">安全保障</p>
              <p class="slogan">注重基础建设，完善监管制度。全方位多环节构建，提高旅游安全保障效率</p>
            </a>
          </li>
          <li class="info-sec1-item animate-item" style="animation-delay: .2s;">
            <a href="channel-detail.html?code=info&channelCode=yjss">
              <span class="img-box">
                <img src="@/assets/images/info-pic-3.jpg" />
              </span>
              <p class="title">硬件设施</p>
              <p class="slogan">景区硬件设施齐备，丰富且完善，可以满足游客的多种需求让旅行更为安心、放心</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 旅游服务 s -->
    <div class="info-service animate-box">
      <div class="main">
        <p class="sec-title">旅游服务</p>
        <p class="sec-slogan">无微不至的贴心关怀，为你的出行保驾护航；您的旅行更方便</p>
        <ul class="info-service-list">
          <li class="info-service-item animate-item" style="animation-delay: 0s;">
            <a href="traffic-guide.html?code=info">
              <span class="icon icon1"></span>
              <p>交通指南</p>
            </a>
          </li>
          <li class="info-service-item animate-item" style="animation-delay: .1s;">
            <a href="hotel-list.html?code=info">
              <span class="icon icon2"></span>
              <p>酒店住宿</p>
            </a>
          </li>
          <li class="info-service-item animate-item" style="animation-delay: .2s;">
            <a href="travel-agency.html?code=next">
              <span class="icon icon3"></span>
              <p>旅行社查询</p>
            </a>
          </li>
          <li class="info-service-item animate-item" style="animation-delay: .3s;">
            <a href="guide-list.html?code=info">
              <span class="icon icon4"></span>
              <p>导游查询</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 旅游服务 e -->
    <div class="info-sec info-sec2 animate-box">
      <div class="main">
        <ul class="info-sec2-list">
          <li class="info-sec2-item animate-item" style="animation-delay: 0s;">
            <a href="news-list.html?code=info&channelCode=zdwyhdyzyb">
              <span class="img-box">
                <img src="@/assets/images/info-pic-4.jpg" />
              </span>
              <p class="title">重点文艺活动一周预报</p>
              <p class="slogan">生活的品质没有界限，对于文化，我们无限追求</p>
            </a>
          </li>
          <li class="info-sec2-item animate-item" style="animation-delay: .1s;">
            <a href="news-list.html?code=info&channelCode=whfw">
              <span class="img-box">
                <img src="@/assets/images/info-pic-5.jpg" />
              </span>
              <p class="title">文化服务</p>
              <p class="slogan">推开文艺世界的门，享受艺术美好</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部信息栏 -->
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from '@/mixins/scroll_animate'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import PageBanner from '@/widgets/page-banner'
export default {
  components: {
    Header,
    Footer,
    PageBanner
  },
  mixins: [scrollAnimate]
}
</script>

<style lang="scss" scoped>
.page-banner {
  background: url('../../assets/images/info-banner.jpg') no-repeat top center fixed;
}

.info-sec {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.info-sec .img-box {
  display: inline-block;
  overflow: hidden;
}
.info-sec .img-box:hover img {
  transform: scale(1.1);
}
.info-sec1 {
  height: 590px;
}
.info-sec1-list {
  margin-top: 100px;
  overflow: hidden;
}
.info-sec1-item {
  float: left;
}
.info-sec1-item img {
  display: block;
}
.info-sec1-item~.info-sec1-item {
  margin-left: 41px;
}
.info-sec1-item .title {
  margin-top: 28px;
  width: 426px;
  font-size: 20px;
  text-align: center;
}
.info-sec1-item .slogan {
  margin-top: 20px;
  padding: 0 6px;
  width: 426px;
  font-size: 16px;
  color: #666;
  text-align: center;
  line-height: 1.5;
}

.info-service {
  padding-top: 146px;
  width: 100%;
  height: 560px;
  background: url('../../assets/images/info-bg.jpg') no-repeat top center fixed;
}
.info-service .sec-title,
.info-service .sec-slogan
{
  color: #fff;
}
.info-service-list {
  margin-top: 48px;
  padding: 0 150px;
  text-align: center;
  font-size: 0;
}
.info-service-item {
  margin-right: 220px;
  display: inline-block;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
.info-service-item a {
  color: #fff;
}
.info-service-item:last-child {
  margin-right: 0;
}
.info-service-item .icon {
  margin-bottom: 26px;
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.info-service-item .icon1 {
  background: rgba(255, 255, 255, .3) url('../../assets/images/info-service-icon1.png') no-repeat center;
}
.info-service-item .icon2 {
  background: rgba(255, 255, 255, .3) url('../../assets/images/info-service-icon2.png') no-repeat center;
}
.info-service-item .icon3 {
  background: rgba(255, 255, 255, .3) url('../../assets/images/info-service-icon3.png') no-repeat center;
}
.info-service-item .icon4 {
  background: rgba(255, 255, 255, .3) url('../../assets/images/info-service-icon4.png') no-repeat center;
}
.info-sec2 {
  height: 560px;
}
.info-sec2-list {
  margin-top: 120px;
  overflow: hidden;
}
.info-sec2-item {
  position: relative;
  float: left;
}
.info-sec2-item:last-child {
  margin-left: 40px;
}
.info-sec2-item img {
  display: block;
}
.info-sec2-item .title {
  position: absolute;
  left: 0;
  bottom: 62px;
  width: 100%;
  text-align: center;
  color: #fefefe;
  font-size: 24px;
  font-weight: bold;
}
.info-sec2-item .slogan {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 100%;
  text-align: center;
  color: #fefefe;
  font-size: 16px;
  font-weight: bold;
}
</style>
