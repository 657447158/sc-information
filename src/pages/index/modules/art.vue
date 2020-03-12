<template>
  <div class="art">
    <div class="main">
      <div class="sec-title">
        <span class="title">{{$t('index.art.title')}}</span>
        <span class="slogan">{{$t('index.art.slogan')}}</span>
      </div>
      <div class="art-list">
        <ul>
          <li>
            <img src="@/assets/images/index-art-pic.png" />
          </li>
          <li>
            <img src="@/assets/upload/upload-pic1.png" />
          </li>
          <li>
            <img src="@/assets/upload/upload-pic1.png" />
          </li>
          <li>
            <img src="@/assets/upload/upload-pic1.png" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .art {
    position: relative;
    padding-bottom: 125px;
    width: 100%;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 360px;
      background: #f5f5f5;
    }
  }
  .art-list {
    position: relative;
    z-index: 9;
    ul {
      display: flex;
      height: 480px;
    }
    li {
      width: 325px;
      &:not(:first-child) {
        margin-left: 20px;
      }
      &:first-child {
        position: relative;
        img {
          position: relative;
          z-index: 9;
        }
        &::after {
          content: '';
          position: absolute;
          top: -30px;
          left: -30px;
          display: block;
          width: 325px;
          height: 450px;
          background: #e1bea7;
        }
      }
    }
  }
</style>