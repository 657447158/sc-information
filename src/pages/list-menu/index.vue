<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- <P>{{$t('index-page-title')}}</P> -->
    <page-banner channelCode="sy" :title="$t('index.pageTit')" />
    <div class="submenu">
      <div class="menu-item">
          <div class="item-box dropdown">
             <div class="title"><span>Food</span><span class="daq-icon">&#xe6af;</span></div>
             <ul>
                <li>Sichuan cuisine </li>
                <li>Hot Pot</li>
                <li>Refreshments</li>
             </ul>
          </div>
      </div>
      <div class="menu-item">
        <div class="item-box">
             <div class="title"><span>Coffee</span></div>
          </div>
      </div>
      <div class="menu-item">
          <div class="item-box dropdown">
             <div class="title"><span>Tea</span><span class="daq-icon">&#xe6af;</span></div>
             <ul>
                <li>Sichuan cuisine </li>
                <li>Hot Pot</li>
                <li>Refreshments</li>
             </ul>
          </div>
      </div>
      <div class="menu-item">
        <div class="item-box">
             <div class="title"><span>Wine</span></div>
          </div>
      </div>
    </div>
    <div class="list-container main">
      <scroll-load>
        <ul class="list-wrapper" slot="list">
          <li>
            <a href>
              <span class="img-box">
                <img src="@/assets/images/index-journey-pic4.jpg" alt />
              </span>

              <h3>Chengdu Panda Base</h3>
              <p>
                The giant panda breeding research institute fully simulates the wild living environment of
                giant pandas.and raises more than 100 giant pandas.
              </p>
            </a>
          </li>
          <li>
            <span class="img-box">
              <img src="@/assets/images/index-journey-pic4.jpg" alt />
            </span>
            <h3>Chengdu Panda Base</h3>
            <p>
              The giant panda breeding research institute fully simulates the wild living environment of
              giant pandas.and raises more than 100 giant pandas.
            </p>
          </li>
        </ul>
      </scroll-load>
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
// import Loading from "@/widgets/loading";
import ScrollLoad from "@/components/scrollLoad";
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    // Loading,
    ScrollLoad
  },
  mixins: [scrollAnimate]
};
</script>

<style lang="scss" scoped>
.submenu {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e2e2;
  background: #f9f9f9;
  .menu-item {
    position: relative;
    display: flex;
    justify-content: center;
    width: 270px;
    height: 100%;
    box-sizing: border-box;
    .item-box{
      width: 200px;
      margin-top: 22px;
       border: 1px solid transparent;
      box-sizing: border-box;
      &.dropdown:hover{
        height: 220px;
        border: 1px solid #e1e1e1;
        box-shadow: 2px 2px 10px #f2f2f2;
        background: #ffffff;
        ul{
          display: block;
        }
      }
      .title{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        text-align: center;
        color: #666666;
         font-size: 24px;
         .daq-icon{
           margin-left: 12px;
           font-size: 12px;
           color: #6a6a6a;
         }
      }
      ul{
        display: none;
        margin-top: 40px;
        li{
          font-size: 16px;
          line-height: 36px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          &:hover{
              color: #dcb499;
          }
        }
      }
      
    }
    &::after {
      content: "";
      position: absolute;
      top: 39px;
      width: 1px;
      height: 40px;
      right: 0;
      background: #e4e4e4;
    }
    &.noborder {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        right: 0;
        background: transparent;
      }
    }
  }
}
.list-container {
  display: flex;
  justify-content: center;
  background: #ffffff;
  .list-wrapper {
    width: 1360px;

    display: flex;
    flex-wrap: wrap;
    li {
      width: 660px;
      margin-top: 60px;
      .img-box {
        display: block;
        width: 660px;
        height: 432px;
        // background: red;
        overflow: hidden;
        &:hover img {
          transform: scale(1.1);
        }
        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s linear;
        }
      }

      h3 {
        line-height: 72px;
        font-size: 24px;
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #666666;
      }
    }
    li:nth-child(2n) {
      margin-left: 40px;
    }
  }
}
</style>
