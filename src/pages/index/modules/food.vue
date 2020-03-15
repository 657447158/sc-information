<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.food.title')}}</span>
      <span class="slogan">{{$t('index.food.slogan')}}</span>
    </div>
    <div class="food-box">
      <div class="food-box-pic">
        <img src="@/assets/images/index-food-pic.png" />
      </div>
      <div class="food-box-list">
        <div class="food-box-item">
          <p class="theme-box-title">{{$t('index.food.theme')}}</p>
          <p class="theme-box-slogan">{{$t('index.food.theme-slogan')}}</p>
          <a class="theme-box-more" href="list-menu.html?code=chcbt">{{$t('index.more')}}</a>
        </div>
        <a 
          class="food-box-item"
          :href="`article-detail.html?id=${item.id}`"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <span class="img-box">
            <img :src="item.coverTwoToOne" v-if="index === 2" />
            <img :src="item.coverOneToOne" v-else />
          </span>
          <span class="modal-box">{{item.title}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from '@/service'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      Ajax.getNewsList({
        channelCode: 'chcbt',
        limitPage: 4,
        recommend: 0
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .food-box {
    position: relative;
    &-list {
      height: 640px;
    }
    &-pic {
      position: absolute;
      top: 0;
      right: 0;
      width: 310px;
      height: 310px;
      overflow: hidden;
      img {
        display: block;
        font-size: 0;
        width: 100%;
        height: 100%;
      }
    }
    &-item {
      position: absolute;
      display: block;
      width: 310px;
      height: 310px;
      background-position: center;
      background-repeat: no-repeat;
      &:first-child {
        top: 0;
        left: 0;
        padding: 86px 0 0 60px;
        width: 700px;
        color: #fff;
        background: #d3a180;
      }
      &:nth-child(2) {
        top: 0;
        left: 720px;
      }
      &:nth-child(3) {
        bottom: 0;
        left: 0;
      }
      &:nth-child(4) {
        bottom: 0;
        left: 330px;
        width: 700px;
      }
      &:nth-child(5) {
        bottom: 0;
        right: 0;
      }
      &:hover .modal-box { opacity: 1; }
      .img-box {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>