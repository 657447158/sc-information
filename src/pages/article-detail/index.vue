<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- <P>{{$t('index-page-title')}}</P> -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <div class="article-container">
      <div class="article">
        <p>Snowflakes are slowly flying and dancing in the air, the mountainside of Mount Emei is shrouded in mist and snow, and you feel like you are in a fairyland.</p>
        <p>
          Mount Emei is located near the mysterious north latitude of 30 degrees, and is located in the southwestern part of the Sichuan Basin. With its "majesty, show, god, wonder, and
          spirit" and deep Buddhist culture, it has become a world natural and cultural heritage.
        </p>
        <p>
          Mount Emei actually includes the four major mountains of Da'e, Er'e, San'e, and Si'e; however, Emei Mountain, which is often referred to, mainly refers to Da'e Mountain. The
          mountain extends north-south, stretching 23 kilometers, covering an area of about 115 square kilometers. The highest peak, Wanfoding, is 3,099 meters above sea level, while
          the plain area below the mountain is only over 400 meters above sea level, with a relative height difference of more than 2600 meters, far exceeding many well-known domestic
          tourist mountains such as Wuyue and Huangshan.
        </p>
        <img src="@/assets/images/test.png" alt />
        <p>
          Mount Emei is not only rich in natural heritage, it is known as the "Plant Kingdom", "Animal Paradise" and "Geological Museum", and is praised as "Emei World Show".
          Moreover, it has deep cultural heritage and is one of the four famous Buddhist mountains in China. It is famous for worshipping the Puxian Bodhisattva. At present, Buddhist
          culture is the core. There are about 300 monks and nuns in the whole mountain, and nearly 30 large and small temples. Famous temples include Baoguo Temple, Fuhu
          Temple, Wannian Temple, Qingyin Pavilion, and Huazang Temple.
        </p>
        <p>
          It is precisely this mystery, richness, and deepness that Emeishan can "exceed the Five Sacred Mountains, Xiujia Kyushu", and have the eternal poetry of "Emei, the leader of
          the mountain; Puxian, the eldest son of the Buddha", it is fascinating.
        </p>
      </div>
    </div>
    <Loading />
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";
export default {
  components: {
    Header,
    Footer,
    PageBanner
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.article-container {
  width: 100%;
  min-width: 1360px;
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  .article {
    width: 1360px;
    margin-top: 60px;
    margin-bottom: 100px;
    background: #ffffff;
    min-height: 100px;
    padding: 40px;
    p{
      font-size: 16px;
      line-height: 24px;
      color: #666666;
      margin-top: 40px;
    }
    img{
      width: 100%;
      margin-top: 40px ;
    }
  }
}
</style>
