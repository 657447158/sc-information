<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 二级页面banner -->
    <page-banner title="下一站，出发" />
    <div class="next-box animate-box">
      <div class="main">
        <p class="next-title">四川，天府之国</p>
        <p class="next-slogan">期待您的到来！感受自然风光的同时，寻找味觉上的刺激......了解您在四川可体验的一切。</p>
        <ul class="next-list">
          <li class="next-item animate-item" style="animation-delay: 0s;">
            <a href="next-list.html?code=next&channelCode=zrfg">
              <span class="img-box">
                <img src="@/assets/images/next-zrfg.jpg" />
              </span>
              <p class="title">自然风光</p>
              <p class="sub-title">霞光与雪山，山川与河流，草原与湿地，每一段旅程都是美好的体验</p>
            </a>
          </li>
          <li class="next-item animate-item" style="animation-delay: .1s;">
            <a href="next-list.html?code=next&channelCode=mlrw">
              <span class="img-box">
                <img src="@/assets/images/next-mlrw.jpg" />
              </span>
              <p class="title">魅力人文</p>
              <p class="sub-title">岁月留下宝贵礼物，等你一起开启巴蜀大地时光密码</p>
            </a>
          </li>
          <li class="next-item animate-item" style="animation-delay: .2s;">
            <a href="next-list.html?code=next&channelCode=jdcq">
              <span class="img-box">
                <img src="@/assets/images/next-jdcq.jpg" />
              </span>
              <p class="title">经典传奇</p>
              <p class="sub-title">人类宝贵的文明财富，在凝固的时间里看见过去</p>
            </a>
          </li>
          <li class="next-item animate-item" style="animation-delay: .3s;">
            <a href="next-list.html?code=next&channelCode=xxty">
              <span class="img-box">
                <img src="@/assets/images/next-xxty.jpg" />
              </span>
              <p class="title">休闲体验</p>
              <p class="sub-title">对时间最好的珍视，就是去这些有趣的地方撒野</p>
            </a>
          </li>
          <li class="next-item animate-item" style="animation-delay: .4s;">
            <a href="next-list.html?code=next&channelCode=jrkh">
              <span class="img-box">
                <img src="@/assets/images/next-jrkh.jpg" />
              </span>
              <p class="title">假日狂欢</p>
              <p class="sub-title">假期清单在手，保你耍安逸~</p>
            </a>
          </li>
          <li class="next-item animate-item" style="animation-delay: .5s;">
            <a href="next-list.html?code=next&channelCode=tflymx">
              <span class="img-box">
                <img src="@/assets/images/next-tflymx.jpg" />
              </span>
              <p class="title">天府旅游名县</p>
              <p class="sub-title">争创世界重要旅游目的地，推动治蜀兴川再上新台阶</p>
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
  background: url('../../assets/images/next-banner.jpg') no-repeat top center fixed;
}

.next-box {
  padding-top: 100px;
  width: 100%;
  height: 1314px;
}
.next-title {
  font-size: 36px;
  font-weight: bold;
}
.next-slogan {
  margin-top: 20px;
  font-size: 18px;
  color: #666; 
}
.next-list {
  margin-top: 60px;
  overflow: hidden;
}
.next-item {
  margin-bottom: 41px;
  position: relative;
  float: left;
}
.next-item .img-box {
  display: inline-block;
  overflow: hidden;
}
.next-item img {
  display: block;
}
.next-item~.next-item:not(:nth-child(3)) {
  margin-left: 41px;
}
.next-item .title,
.next-item .sub-title
{
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.next-item .title {
  font-size: 24px;
  font-weight: bold;
  bottom: 62px;
}
.next-item:hover img {
  transform: scale(1.1);
}
</style>
