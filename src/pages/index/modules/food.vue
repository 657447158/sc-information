<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.food.title')}}</span>
      <span class="slogan">{{$t('index.food.slogan')}}</span>
    </div>
    <div class="food-list">
      <ul>
        <li>
          <p class="theme-box-title">{{$t('index.food.theme')}}</p>
          <p class="theme-box-slogan">{{$t('index.food.theme-slogan')}}</p>
          <a class="theme-box-more" href="">{{$t('index.more')}}</a>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .food-list {
    ul {
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
      height: 640px;
      li {
        height: 310px;
        background: #999;
        &:not(:nth-child(3n + 1)) {
          margin-left: 20px;
        }
        &:first-child {
          padding: 86px 0 0 60px;
          width: 700px;
          color: #fff;
          background: #d3a180;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(6)
        { width: 310px; }
        &:nth-child(5) { width: 700px; }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>