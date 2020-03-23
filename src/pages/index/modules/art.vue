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
            <a class="theme-box-more" href="list-menu.html?code=wymsh">{{$t('index.more')}}</a>
          </li>
          <li
            v-for="item in list"
            :key="item.id"
          >
            <a class="item" :href="`article-detail.html?id=${item.id}`">
              <span class="img-box">
                <img :src="item.coverTwoToThree" />
              </span>
              <span class="modal-box">{{item.title}}</span>
            </a>
          </li>
        </ul>
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
        channelCode: 'wymsh',
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
      position: relative;
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
      &:hover {
        .modal-box { opacity: 1;}
      }
      .theme-box-more {
        position: absolute;
        bottom: 30px;
        right: 30px;
        z-index: 10;
        color: #fff;
        background: $themeColor;
      }
      .item {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
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
    }
  }
</style>