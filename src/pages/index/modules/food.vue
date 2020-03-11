<template>
  <div class="index-food">
		<div class="index-food-top">
      <a href="food-list.html?code=destination">
        <p class="sec-title">吃货藏宝图</p>
        <p class="sec-slogan">在四川各地，您和友人都能品尝到当地的新鲜美食，体验齿颊留香的美妙感觉</p>
        <span class="sec-more"></span>
      </a>
		</div>
		<div class="index-food-bottom animate-box">
			<ul class="index-food-list main">
        <li
          class="index-food-item animate-item"
          :style="`animation-delay: ${index * .1}s;`"
          v-for="(item, index) in list"
          :key="item.id"
        >
					<a :href="`news-detail.html?code=next&id=${item.id}`">
            <span class="img-box">
              <img :src="item.coverFourToThree" />
            </span>
            <p class="name" :title="item.title">{{item.title}}</p>
          </a>
				</li>
			</ul>
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
        limitPage: 3,
        channelCode: 'xxty',
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
.index-food {
  height: 1080px;
  background: url('../../../assets/images/index-food-bg.jpg') fixed no-repeat top center;
  background-size: 100% 100%;
  &-top {
    padding-top: 228px;
    width: 100%;
    height: 600px;
    color: #fff;
    a {
      display: block;
      margin: 0 auto;
      width: 700px;
      color: #fff;
    }
    .index-slogan {
      color: #fff;
    }
  }
  &-bottom {
    width: 100%;
    height: 480px;
    background: #fff;
    overflow: hidden;
  }
  &-list {
    margin-top: 48px;
    overflow: hidden;
  }
  &-item {
    float: left;
    width: 426px;
    overflow: hidden;
    &~& {
      margin-left: 41px;
    }
    &:hover img {
      transform: scale(1.1);
    }
    .img-box {
      display: block;
      width: 100%;
      height: 280px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin-top: 30px;
      padding: 0 24px;
      font-size: 20px;
      color: #666;
      text-align: center;
      @include ellipsis();
    }
  }
}
</style>
