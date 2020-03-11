<template>
  <div class="index-scenery">
		<div class="index-scenery-top">
			<a href="scenery-list.html?code=destination">
        <p class="sec-title">悠闲好光景</p>
        <p class="sec-slogan">在四川，一年四季都深受人们欢迎，我们竭诚让您全程欢乐、不虚此行</p>
        <span class="sec-more"></span>
      </a>
		</div>
		<div class="index-scenery-bottom animate-box">
			<ul class="index-scenery-list main">
				<li
          class="index-scenery-item animate-item"
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
        channelCode: 'zrfg',
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
.index-scenery {
  height: 1080px;
  background: url('../../../assets/images/index-scenery-bg.jpg') fixed no-repeat top center;
  background-size: 100% 100%;
  &-top {
    padding-top: 228px;
    width: 100%;
    height: 600px;
    a {
      display: block;
      margin: 0 auto;
      width: 600px;
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
