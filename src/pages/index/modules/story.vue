<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.story.title')}}</span>
    </div>
    <ul class="story-list">
      <li>
        <img src="@/assets/images/index-story-pic.png" />
         <a class="theme-box-more" href="list-menu.html?code=jxgsh">{{$t('index.more')}}</a>
      </li>
      <li>
        <a 
          :href="`article-detail.html?id=${item.id}`"
          class="story-list-item"
          v-for="(item, index) in list"
          :key="item.id" 
        >
          <span class="img-box">
            <img :src="item.coverTwoToOne" v-if="index === 1" />
            <img :src="item.coverOneToOne" v-else />
          </span>
          <span class="modal-box">{{item.title}}</span>
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
      list: []
    }
  },
  mounted () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      Ajax.getNewsList({
        channelCode: 'jxgsh',
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
  .story-list {
    position: relative;
    display: flex;
    padding-left: 280px;
    height: 540px;
    li {
      width: 540px;
      height: 100%;
      overflow: hidden;
      &:first-child {
        position: absolute;
        top: 0;
        left: -280px;
      }
      // &:nth-child(2) {
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   padding: 40px 40px 0;
      //   width: 520px;
      //   height: 270px;
      //   color: #fff;
      //   background: #d3a180;
      // }
      // &:nth-child(3) {
      //   display: flex;
      //   align-items: flex-end;
      //   width: 1080px;
      // }
      img {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 0;
      }
      .theme-box-more {
        position: absolute;
        bottom: 40px;
        right: 40px;
      }
    }
    &-item {
      position: relative;
      &:hover .modal-box { opacity: 1; }
      &:nth-child(1) {
        width: 540px;
        height: 100%;
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
        width: 520px;
        height: 270px;
      }
      &:nth-child(3) {
        position: absolute;
        bottom: 0;
        right: 270px;
        width: 250px;
        height: 250px;
      }
      &:nth-child(4) {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 250px;
        height: 250px;
      }
      .img-box {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>