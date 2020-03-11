<template>
	<div class="des-list animate-box">
		<div class="main">
			<p class="sec-title">跟随兴趣去旅行，来一场说走就走的旅行</p>
			<p class="sec-slogan">这个时节，同城的人都爱去，给不安分的心一个躁动的理由</p>
			<ul>
				<li
					class="des-list-item animate-item"
					:style="`animation-delay: ${index * .1}s;`"
					v-for="(item, index) in list"
					:key="item.id"
				>
					<a :href="`destination-detail.html?code=destination&id=${item.id}`">
						<span class="img-box">
							<img v-if="item.coverFourToThree" :src="item.coverFourToThree" />
						</span>
						<p class="name">{{item.regionName}}</p>
						<p class="slogan">{{item.introduction}}</p>
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
		this.getDestinationList()
	},
	methods: {
		getDestinationList () {
			Ajax.getDestinationList({
				limitPage: 6
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
.des-list {
  padding-top: 100px;
  width: 100%;
  height: 934px;
  background: #fff;
	ul {
		margin-top: 60px;
		overflow: hidden;
	}
	&-item {
		margin-bottom: 40px;
		float: left;
		width: 426px;
		height: 280px;
		&~&:not(:nth-child(4)) {
			margin-left: 41px;
		}
		&:hover img {
			transform: scale(1.1);
		}
		>a {
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
				background: url('../../../assets/images/modal-h280.png') repeat-x bottom left;
			}
		}
		.img-box {
			display: block;
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: #e2e2e2;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.name {
			position: absolute;
			bottom: 62px;
			left: 0;
			z-index: 10;
			width: 100%;
			font-size: 24px;
			font-weight: bold;
			color: #fefefe;
			text-align: center;
		}
		.slogan {
			position: absolute;
			bottom: 30px;
			left: 0;
			z-index: 10;
			padding: 0 24px;
			width: 100%;
			font-size: 16px;
			color: #fefefe;
			text-align: center;
			@include ellipsis();
		}
	}
}

</style>
