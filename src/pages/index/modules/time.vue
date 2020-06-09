<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.time.title')}}</span>
    </div>
    <div class="list-box">
      <div class="list-box-list">
        <div class="list-box-item">
          <img class="pic" src="@/assets/images/index-time-pc.png" />
          <a href="list-menu.html?code=scfj" class="theme-box-more">{{$t('index.more')}}</a>
        </div>
        <a
          :href="`article-detail.html?id=${item.id}`"
          class="list-box-item"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <span class="img-box">
            <img :src="item.coverOneToOne" v-if="index === 0" />
            <img :src="item.coverTwoToOne" v-else />
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
        channelCode: 'scfj',
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
  .list-box {
    width: 100%;
    height: 560px;
    &-list {
      position: relative;
      height: 100%;
      display: flex;
    }
    &-item {
      // margin-right: 20px;
      position: absolute;
      display: block;
      width: 540px;
      height: 100%;
      overflow: hidden;
      background-position: center;
      &:hover {
        .modal-box {
          opacity: 1;
        }
      }
      &:nth-child(1) {
        position: relative;
        top: 0;
        left: 560px;
        height: 270px;
      }
      &:nth-child(2) {
        top: 0;
        left: 0;
      }
      &:nth-child(3) {
        bottom: 0;
        left: 560px;
        height: 270px;
      }
      &:nth-child(4) {
        top: 0;
        right: -300px;
        height: 270px;
      }
      &:nth-child(5) {
        bottom: 0;
        right: -300px;
        height: 270px;
      }
      .img-box {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .pic {
        display: block;
        width: 100%;
        height: 270px;
      }
      .theme-box-more {
        position: absolute;
        right: 40px;
        bottom: 40px;
      }
    }
    .theme-box {
      margin-top: 20px;
      padding: 84px 36px 0 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      height: 270px;
      color: #fff;
      background-color: #d3a180;
    }
  }
</style>