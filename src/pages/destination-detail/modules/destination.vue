<template>
  <div class="detail-des">
    <div class="main">
      <p class="detail-sec-title">想FUN肆？更多热门目的地等你来探索</p>
      <ul class="detail-des-list">
        <li
          class="detail-des-item"
          v-for="item in list"
          :key="item.id"
        >
          <a :href="`destination-detail.html?code=destination&id=${item.id}`">
            <span class="img-box">
              <img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
            </span>
            <p class="name">{{item.regionName}}</p>
            <p class="intro">{{item.introduction}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Ajax from '@/service'
import Tools from '@/utils/tools'
export default {
  data () {
    return {
      id: Tools.getUrlParams('id'),
      list: []
    }
  },
  mounted () {
    this.getDestinationList()
  },
  methods: {
    // 获取目的地列表
    getDestinationList () {
      Ajax.getDestinationList({
        limitPage: 5
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas.filter(item => {
            return item.id != this.id
          }).slice(0, 4)
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.detail-des {
  padding-top: 100px;
  width: 100%;
  height: 490px;
}
.detail-des-list {
  overflow: hidden;
}
.detail-des-item {
  float: left;
  &~& {
    margin-left: 40px;
  }
  &:hover img {
    transform: scale(1.1);
  }
  a {
    display: block;
    width: 310px;
    height: 200px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      background: url('../../../assets/images/modal-h200.png') repeat-x;
    }
  }
  .img-box {
    display: block;
    width: 310px;
    height: 200px;
    overflow: hidden;
    background: #e2e2e2;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  p {
    position: absolute;
    bottom: 30px;
    left: 0;
    z-index: 9;
    width: 100%;
    text-align: center;
    color: #fefefe;
  }
  .name {
    bottom: 54px;
    font-size: 16px;
    font-weight: bold;
  }
  .intro {
    padding: 0 24px;
    width: 100%;
    @include ellipsis();
  }
}
</style>
