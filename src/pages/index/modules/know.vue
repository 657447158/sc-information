<template>
	<div class="index-know animate-box">
		<div class="main">
			<p class="sec-title">了解新鲜事</p>
			<p class="sec-slogan">有朋自远方来，不亦乐乎；查看我们的最新文章和活动</p>
			<ul class="index-know-list">
				<li
          class="index-know-item animate-item"
          :style="`animation-delay: ${index * .1}s;`"
          v-for="(item, index) in list"
          :key="item.id"
          :title="item.title"
        >
					<a :href="`news-detail.html?code=next&id=${item.id}`">
            <img v-if="index < 3" :src="item.coverFourToThree" />
            <img v-else :src="item.coverTwoToOne" />
            <p class="name">{{item.title}}</p>
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
      this.getMultChannelNewsList()
    },
    methods: {
      getMultChannelNewsList () {
        Ajax.getMultChannelNewsList({
          channelCode: 'zrfg,mlrw,jrkh,jdcq,xxty'
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
.index-know {
  padding-top: 100px;
  width: 100%;
  height: 982px;
  &-list {
    margin-top: 60px;
    overflow: hidden;
  }
  &-item {
    margin-bottom: 40px;
    float: left;
    width: 426px;
    height: 280px;
    overflow: hidden;
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        display: block;
        width: 100%;
        height: 100%;
        background: url('../../../assets/images/modal-h280.png') repeat-x;
        background-size: 100% 100%;
      }
    }
    &~&:not(:nth-child(4)) {
      margin-left: 40px;
    }
    &:nth-child(4),
    &:nth-child(5) {
      width: 660px;
      height: 330px;
    }
    &:hover img {
      transform: scale(1.1);
    }
    .name {
      position: absolute;
      bottom: 30px;
      left: 0;
      z-index: 9;
      padding: 0 24px;
      width: 100%;
      font-size: 20px;
      color: #fff;
      text-align: center;
      @include ellipsis();
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
