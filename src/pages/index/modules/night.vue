<template>
  <div class="night">
    <div class="main">
      <div class="sec-title">
        <span class="title">{{$t('index.night.title')}}</span>
        <span class="slogan">{{$t('index.night.slogan')}}</span>
      </div>
      <div class="night-box">
        <div class="night-left">
          <div class="night-left-top">
            <img src="@/assets/images/index-night-bg1.png" />
            <div class="box" v-html="detail.summary"></div>
          </div>
          <div class="night-left-bottom" v-html="detail.content">
            <!-- <p>Famous night owl gathering place</p>
            <p>Work is too depressive during the day, go to the bar for drinks and drinks at night</p>
            <p>It has become a must check-in place for many people living in Sichuan to relieve stress and</p>
            <p>release themselves.</p> -->
          </div>
        </div>
        <div class="night-center">
          <p>{{$t('index.night.theme')}}</p>
          <p>{{$t('index.night.theme-slogan')}}</p>
          <a class="theme-box-more" href="">{{$t('index.more')}}</a>
        </div>
        <div class="night-right">
          <img src="@/assets/images/index-night-pic2.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from '@/service'
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    Ajax.getChannelDetail({
      channelCode: 'hsysh'
    }).then(res => {
      if (res.code === 0) {
        this.detail = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .night {
    width: 100%;
    &-box {
      position: relative;
      display: flex;
      height: 640px;
    }
    &-left {
      width: 860px;
      height: 100%;
      &-top {
        position: relative;
        width: 100%;
        height: 360px;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 98px;
          display: block;
          width: 298px;
          height: 305px;
          background: url('../../../assets/images/index-night-logo.png') no-repeat;
        }
        img {
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          font-size: 0;
        }
        .box {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 60px 30px;
          width: 100%;
          height: 180px;
          color: #333;
          font-size: 24px;
          background: #fff;
          p { margin-bottom: 10px; }
        }
      }
      &-bottom {
        padding: 86px 0 0 30px;
        width: 100%;
        height: 280px;
        color: #666;
        font-size: 18px;
        line-height: 24px;
        background: #f5f5f5;
      }
    }
    &-center {
      position: relative;
      width: 280px;
      height: 100%;
      background: #d3a180;
      font-size: 120px;
      color: rgba(255, 255, 255, .8);
      font-weight: bold;
      overflow: hidden;
      p {
        position: absolute;
        top: -20px;
        transform: rotate(90deg);
        transform-origin: 0 0;
        &:first-child {
          right: -580px;
        }
        &:nth-child(2) {
          right: -380px;
        }
      }
      .theme-box-more {
        position: absolute;
        bottom: 60px;
        left: 60px;
      }
    }
    &-right {
      position: absolute;
      top: 0;
      right: -280px;
      width: 500px;
      height: 360px;
    }
  }
</style>