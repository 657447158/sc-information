<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.time.title')}}</span>
      <span class="slogan">{{$t('index.time.slogan')}}</span>
    </div>
    <div class="list-box">
      <ul>
        <li class="list-box-item hover">
          <img src="@/assets/upload/index-time-pic1.jpg" />
          <span class="modal-box">Emeishan real-name ticket purchase system</span>
        </li>
        <li class="list-box-item hover">
          <img src="@/assets/images/index-time-pc.png" />
          <div class="theme-box">
            <p class="theme-box-title">{{$t('index.time.theme')}}</p>
            <p class="theme-box-slogan">{{$t('index.time.theme-slogan')}}</p>
            <a href="" class="theme-box-more">{{$t('index.more')}}</a>
          </div>
        </li>
        <li class="list-box-item">
          <div class="box hover">
            <img src="@/assets/upload/index-time-pic1.jpg" />
            <span class="modal-box">Emeishan real-name ticket purchase system</span>
          </div>
          <div class="box hover">
            <img src="@/assets/upload/index-time-pic1.jpg" />
            <span class="modal-box">Emeishan real-name ticket purchase system</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .list-box {
    width: 100%;
    height: 540px;
    ul {
      height: 100%;
      display: flex;
    }
    &-item {
      position: relative;
      width: 540px;
      height: 100%;
      &:nth-child(2) {
        width: 560px;
      }
      &:nth-child(3) {
        height: 270px;
      }
      img {
        display: block;
        font-size: 0;
      }
      .box {
        position: relative;
        height: 100%;
        overflow: hidden;
      }
      .modal-box {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: flex-end;
        padding: 30px;
        width: 100%;
        height: 540px;
        font-size: 18px;
        color: #fff;
        transition: all .3s linear;
        background: url('../../../assets/images/modal-h540.png') repeat-x;
      }
    }
    .hover:hover {
      .modal-box {
        opacity: 1;
      }
    }
    .theme-box {
      padding: 44px 36px 0 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      height: 220px;
      color: #fff;
      background-color: #d3a180;
      &-title {
        margin-bottom: 16px;
        font-size: 46px;
        font-weight: bold;
      }
      &-slogan {
        margin-bottom: 16px;
        font-size: 24px;
      }
    }
  }
</style>