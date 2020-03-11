<template>
  <div class="detail-scenery">
    <div class="main">
      <p class="detail-sec-title">必游景点排行</p>
      <ul class="scenery-list">
        <li
          class="scenery-item animate-item"
          :style="`animation-delay: ${index * .1}s;`"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <a :href="`scenery-detail.html?code=destination&id=${item.id}`">
            <span class="img-box">
              <img v-if="item.picture" :src="item.picture" />
            </span>
            <p class="name" :title="item.name">{{item.name}}</p>
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
    this.getDestinationScenerys()
  },
  methods: {
    // 获取目的地推荐景区
    getDestinationScenerys () {
      Ajax.getDestinationScenerys({
        destinationId: this.id,
        limitPage: 4
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.detail-scenery {
  padding-top: 100px;
  width: 100%;
  height: 540px;
  background: #f5f5f5;
}
.detail-scenery .scenery-list {
  overflow: hidden;
}
.detail-scenery .scenery-item {
  float: left;
  width: 310px;
}
.detail-scenery .scenery-item~.scenery-item {
  margin-left: 40px;
}
.detail-scenery .scenery-item .img-box {
  display: block;
  width: 310px;
  height: 200px;
  overflow: hidden;
  background: #e2e2e2;
  img {
    width: 100%;
    height: 100%;
  }
}
.detail-scenery .scenery-item img {
  display: block;
}
.detail-scenery .scenery-item:hover img {
  transform: scale(1.1);
}
.detail-scenery .scenery-item .name {
  margin-top: 30px;
  padding: 0 24px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #666;
  @include ellipsis();
}
</style>
