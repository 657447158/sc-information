<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.story.title')}}</span>
    </div>
    <ul class="story-list">
      <li>
        <img src="@/assets/images/index-story-pic.png" />
      </li>
      <li>
        <p class="theme-box-title">{{$t('index.story.theme')}}</p>
        <a class="theme-box-more" href="list-menu.html?code=jxgsh">{{$t('index.more')}}</a>
      </li>
      <li>
        <a 
          :href="`article-detail.html?id=${item.id}`"
          class="story-list-item"
          v-for="item in list"
          :key="item.id" 
        >
          <span class="img-box">
            <img :src="item.coverOneToOne" alt="">
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
        limitPage: 3,
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
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
        padding: 40px 40px 0;
        width: 520px;
        height: 270px;
        color: #fff;
        background: #d3a180;
      }
      &:nth-child(3) {
        display: flex;
        align-items: flex-end;
        width: 1080px;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 0;
      }
    }
    &-item {
      position: relative;
      &:hover .modal-box { opacity: 1; }
      &:nth-child(1) {
        width: 540px;
        height: 100%;
      }
      &:nth-child(2),
      &:nth-child(3) {
        margin-left: 20px;
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