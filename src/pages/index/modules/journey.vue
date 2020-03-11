<template>
  <div class="index-journey animate-box">
		<div class="main">
			<p class="sec-title">规划行程</p>
			<p class="sec-slogan">无微不至的贴心关怀，为你的出行保驾护航；您的旅行更方便</p>
			<ul class="index-journey-list">
				<li class="index-journey-item animate-item" style="animation-delay: 0s;">
					<a href="traffic-guide.html?code=info">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic1.jpg" />
						</span>
						<p class="name">交通指南</p>
						<p class="slogan">全球多座城市都有直飞四川的航班，您还可以选择乘高铁、坐巴士甚至自驾前往</p>
					</a>
				</li>
				<li class="index-journey-item animate-item" style="animation-delay: .1s;">
					<a href="channel-detail.html?channelCode=jjhqh">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic2.jpg" />
						</span>
						<p class="name">季节和气候</p>
						<p class="slogan">地处亚热带湿润气候区，全年温暖湿润、气候宜人，地带性和垂直变化十分明显</p>
					</a>
				</li>
				<li class="index-journey-item animate-item" style="animation-delay: .2s;">
					<a href="hotel-list.html?code=info">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic3.jpg" />
						</span>
						<p class="name">酒店住宿</p>
						<p class="slogan">寻找合适的住宿之处是旅行计划中非常重要的一环。在此开始，找到称心如意的住处</p>
					</a>
				</li>
				<li class="index-journey-item animate-item" style="animation-delay: 0s;">
					<a href="channel-detail.html?code=info&channelCode=lyxts">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic4.jpg" />
						</span>
						<p class="name">旅游小贴士</p>
						<p class="slogan">我们相信，只要游客满意，他们将再次光临，特此为您奉上最佳旅行贴士，愿您拥有美好的旅程</p>
					</a>
				</li>
				<li class="index-journey-item animate-item" style="animation-delay: .1s;">
					<a href="channel-detail.html?channelCode=kcxlymdd">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic5.jpg" />
						</span>
						<p class="name">可持续旅游目的地</p>
						<p class="slogan">更绿色，更清洁——还有更真实。下次旅行，拜访可持续性旅游目的地</p>
					</a>
				</li>
				<li class="index-journey-item animate-item" style="animation-delay: .2s;">
					<a href="channel-detail.html?code=info&channelCode=aqbz">
						<span class="img-box">
							<img src="@/assets/images/index-journey-pic6.jpg" />
						</span>
						<p class="name">安全保障</p>
						<p class="slogan">注重基础建设，完善监管制度。全方位多环节构建，提高旅游安全保障效率</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>

</script>
<style lang="scss" scoped>
.index-journey {
  padding-top: 100px;
  width: 100%;
  height: 1172px;
  &-list {
    margin-top: 60px;
    overflow: hidden;
  }
  &-item {
    margin-bottom: 60px;
    float: left;
    width: 426px;
    text-align: center;
    &~&:not(:nth-child(4)) {
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
    }
    .name {
      margin: 28px 0 16px;
      font-size: 20px;
    }
    .slogan {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
    }
  }
}
</style>
