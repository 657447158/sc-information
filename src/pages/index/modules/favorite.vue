<template>
  <div class="favorite main">
    <ul class="favorite-list">
      <li>
        <img :src="detail.titleImage" />
        <p class="summary">{{detail.summary}}</p>
        <div class="search" @click="showDropDownHandle">
          <p>{{$t('index.secTheme.placeholder')}}</p>
          <span class="icon" :class="{active: showDropDown}"></span>
        </div>
        <div class="drop-down" :class="{active: showDropDown}">
          <a href="list-menu.html?code=yxhgj">{{$t('index.time.title')}}</a>
          <a href="list-menu.html?code=wymsh">{{$t('index.art.title')}}</a>
          <a href="list-menu.html?code=chcbt">{{$t('index.food.title')}}</a>
          <a href="list-menu.html?code=jxgsh">{{$t('index.story.title')}}</a>
          <a href="list-menu.html?code=hsysh">{{$t('index.night.title')}}</a>
        </div>
      </li>
      <li
        v-for="(item, index) in list"
        :key="item.id"
      >
        <a :href="`article-detail.html?id=${item.id}`">
          <span class="img-box">
            <img :src="item.cover" v-if="index === 0 || index === 2 || index === 3 || index === 5" />
            <img :src="item.coverTwoToThree" v-if="index === 1 || index === 4" />
          </span>
          <p class="title">{{item.title}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Ajax from '@/service'
export default {
  data () {
    return {
      showDropDown: false,
      list: [],
      detail: {}
    }
  },
  mounted () {
    this.getChannelDetail()
    this.getNewsList()
  },
  methods: {
    showDropDownHandle () {
      this.showDropDown = !this.showDropDown
    },
    getChannelDetail () {
      Ajax.getChannelDetail({
        channelCode: 'zttj'
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    },
    getNewsList () {
      Ajax.getNewsList({
        channelCode: 'zttj',
        limitPage: 6
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
  .favorite {
    position: relative;
    margin-top: 60px;
    &-list {
      width: 100%;
      height: 700px;
      // overflow: hidden;
    }
    li {
      position: absolute;
      &:nth-child(1) {
        top: 0;
        z-index: 9;
        left: 300px;
        width: 760px;
        height: 420px;
        .summary {
          position: absolute;
          top: 170px;
          width: 100%;
          text-align: center;
          font-size: 46px;
          color: #fff;
          font-weight: bold;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(2) {
        top: 0;
        left: 0;
        width: 280px;
        height: 210px;
      }
      &:nth-child(3) {
        bottom: 0;
        left: 0;
        width: 280px;
        height: 470px;
      }
      &:nth-child(4) {
        bottom: 0;
        left: 300px;
        width: 370px;
        height: 260px;
      }
      &:nth-child(5) {
        bottom: 0;
        left: 690px;
        width: 370px;
        height: 260px;
      }
      &:nth-child(6) {
        bottom: 0;
        right: 0;
        width: 280px;
        height: 470px;
      }
      &:nth-child(7) {
        top: 0;
        right: 0;
        width: 280px;
        height: 210px;
      }
      &:hover {
        .img-box img {
          transform: scale(1.1);
        }
        .title {
          color: #fff;
          background-color: $themeColor;
        }
      }
      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
      }
      .img-box {
        display: block;
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 10px;
        width: 100%;
        font-size: 18px;
        color: #666;
        line-height: 50px;
        background-color: #e2e2e2;
        @include ellipsis();
        transition: all .3s linear;
      }
    }
    .search{
      position: absolute;
      top: 240px;
      left: 120px;
      padding: 0 20px 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 520px;
      height: 60px;
      font-size: 26px;
      color: #666;
      background: #fff;
      .icon {
        width: 20px;
        height: 10px;
        background: url('../../../assets/images/icon-drop-down.png') no-repeat;
        transition: all .3s linear;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .drop-down {
      top: 301px;
      left: 120px;
      padding: 30px 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 520px;
      height: 240px;
      color: #666;
      font-size: 18px;
      background: rgba(255, 255, 255, .9);
      opacity: 0;
      visibility: hidden;
      position: absolute;
      transform: rotateX(90deg);
      transform-origin: 50% 0;
      transition: all .3s linear;
      &.active {
        opacity: 1;
        visibility: visible;
        transform: rotateX(0);
      }
      a {
        margin-bottom: 20px;
        transition: all .3s linear;
        &:hover {
          color: $themeColor;
        }
      }
    }
  }
</style>