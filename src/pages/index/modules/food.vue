<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.food.title')}}</span>
    </div>
    <div class="food-box">
      <div class="food-box-pic">
        <img src="@/assets/images/index-food-pic.png" />
        <a class="theme-box-more" href="list-menu.html?code=chcbt">{{$t('index.more')}}</a>
      </div>
      <div class="food-box-list">
        <a 
          class="food-box-item"
          :href="`article-detail.html?id=${item.id}`"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <span class="img-box">
            <img :src="item.coverTwoToOne" v-if="index === 0 || index === 3" />
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
    this.getNewsListRecursion()
  },
  methods: {
    getNewsListRecursion () {
      Ajax.getNewsListRecursion({
        channelCode: 'chcbt',
        limitPage: 5,
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
      .theme-box-more {
        position: absolute;
        bottom: 40px;
        right: 40px;
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
        // padding: 86px 0 0 60px;
        width: 700px;
        // color: #fff;
        // background: #d3a180;
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