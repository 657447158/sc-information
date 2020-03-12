<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.story.title')}}</span>
      <span class="slogan">{{$t('index.story.slogan')}}</span>
    </div>
    <ul class="story-list">
      <li>
        <img src="@/assets/images/index-story-pic.png" />
      </li>
      <li></li>
      <li>
        <p class="title">{{$t('index.story.theme')}}</p>
        <p class="slogan">{{$t('index.story.theme-slogan')}}</p>
        <a href="" class="theme-box-more">{{$t('index.more')}}</a>
      </li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .story-list {
    position: relative;
    display: flex;
    padding-left: 280px;
    height: 540px;
    li {
      width: 540px;
      background: #999;
      overflow: hidden;
      &:first-child {
        position: absolute;
        top: 0;
        left: -280px;
      }
      &:nth-child(2) {
        margin-right: 20px;
      }
      &:nth-child(3) {
        padding: 40px 40px 0;
        width: 520px;
        height: 270px;
        color: #fff;
        background: #d3a180;
        .title {
          font-size: 46px;
          font-weight: bold;
          color: rgba(255, 255, 255, .8);
        }
        .slogan {
          margin: 10px 0 16px;
          font-size: 24px;
        }
      }
      &:nth-child(4) {
        position: absolute;
        bottom: 0;
        right: 270px;
        width: 250px;
        height: 250px;
      }
      &:nth-child(5) {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 250px;
        height: 250px;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 0;
      }
    }
  }
</style>