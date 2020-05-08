<template>
  <div class="main">
    <div class="sec-title">
      <span class="title">{{$t('index.time.title')}}</span>
    </div>
    <div class="list-box">
      <div class="list-box-list">
        <div class="list-box-item">
          <img class="pic" src="@/assets/images/index-time-pc.png" />
          <div class="theme-box">
            <p class="theme-box-title">{{$t('index.time.theme')}}</p>
            <a href="list-menu.html?code=yxhgj" class="theme-box-more">{{$t('index.more')}}</a>
          </div>
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
    this.getNewsListRecursion()
  },
  methods: {
    getNewsListRecursion () {
      Ajax.getNewsListRecursion({
        channelCode: 'yxhgj',
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
  .list-box {
    width: 100%;
    height: 540px;
    &-list {
      position: relative;
      height: 100%;
      display: flex;
    }
    &-item {
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
        top: 0;
        left: 540px;
      }
      &:nth-child(2) {
        top: 0;
        left: 0;
      }
      &:nth-child(3) {
        top: 0;
        right: -260px;
        height: 50%;
      }
      &:nth-child(4) {
        bottom: 0;
        right: -260px;
        height: 50%;
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
        height: 320px;
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
    }
  }
</style>