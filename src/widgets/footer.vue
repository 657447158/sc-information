<template>
<div class="footer">
		<p class="footer-left">&copy; 2020 四川省旅游信息中心</p>
		<div class="footer-center">
			<ul class="footer-nav-list">
				<li class="footer-nav-item">
					<a href="index.html">首页</a>
				</li>
				<li class="footer-nav-item">
					<a href="destination.html?code=destination">目的地</a>
				</li>
				<li class="footer-nav-item">
					<a href="next.html?code=next">下一站，出发</a>
				</li>
				<li class="footer-nav-item">
					<a href="info.html?code=info">实用信息</a>
				</li>
				<li class="footer-nav-item">
					<a href="hot-activity.html?code=activity">热门活动</a>
				</li>
			</ul>
			<div class="footer-infos">
				<span>旅游咨询：12301</span>
				<span>投诉电话：96927</span>
				<span>备案号：蜀ICP备10002377号</span>
				<span>技术支持：<a href="http://www.daqsoft.com/" target="_blank">成都中科大旗软件股份有限公司</a></span>
			</div>
		</div>
		<div class="footer-right">
			<div class="item">
        <span class="daq-icon">&#xe610;</span>
        <div class="hover-box">
          <div class="hover-box-item">
            <img src="@/assets/images/wx-dy.jpg" alt="四川文旅厅 (订阅号)" />
            <p>四川文旅厅 (订阅号)</p>
          </div>
          <div class="hover-box-item">
            <img src="@/assets/images/wx-fw.jpg" alt="四川文旅厅 (服务号)" />
            <p>四川文旅厅 (服务号)</p>
          </div>
        </div>
      </div>
			<a class="item" href="https://weibo.com/sichuanlvyou?profile_ftype=1&is_all=1#_0" target="_blank">
        <span class="daq-icon">&#xe606;</span>
      </a>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.footer {
  padding: 0 60px;
  width: 100%;
  height: 240px;
  font-size: 16px;
  color: #666;
  background: #e8e8e8;
  &-left {
    margin-top: 110px; 
    float: left;
  }
  &-center {
    margin-top: 88px;
    float: left;
  }
  &-nav {
    &-list {
      width: 1360px;
      text-align: center;
      overflow: hidden;
    }
    &-item {
      position: relative;
      padding: 0 20px;
      display: inline-block;
      &~&::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 1px;
        height: 20px;
        background: #c0c0c0;
      }
      a {
        color: #666;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  &-infos {
    margin-top: 26px;
    text-align: center;
    font-size: 0;
    span {
      display: inline-block;
      font-size: 16px;
      &~span {
        margin-left: 16px;
      }
    }
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &-right {
    margin-top: 95px;
    float: right;
    display: flex;
    align-items: center;
    .daq-icon {
      font-size: 30px;
      color: #666;
    }
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border: 1px solid #c5c5c5;
      cursor: pointer;
      &:first-child {
        border-right: none;
      }
      &:hover .hover-box {
        opacity: 1;
        visibility: visible;
      }
    }
    .hover-box {
      position: absolute;
      top: -188px;
      left: -285px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      width: 340px;
      height: 170px;
      color: #666;
      font-size: 14px;
      background: #fff;
      border: 1px solid #e3e3e3;
      visibility: hidden;
      opacity: 0;
      &::after {
        position: absolute;
        display: inline-block;
        bottom: -7px;
        right: 26px;
        width: 0;
        height: 0px;
        content: '';
        border-style: solid;
        border-width: 8px;
        border-color: #fff #fff transparent transparent;
        transform: rotate(-225deg);
        box-shadow: 2px -2px 2px #e3e3e3;
      }
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        margin-bottom: 12px;
        width: 98px;
        height: 98px;
      }
    }
  }
}
@media screen and (max-width: 1800px) {
  .footer {
    padding: 30px 60px 0;
  }
  .footer-left,
  .footer-center,
  .footer-right {
    float: none;
  }
  .footer-left {
    margin: 0 auto;
    text-align: center;
  }
  .footer-center {
    margin: 40px auto 0;
    .footer-nav-list {
      width: 100%;
    }
  }
  .footer-right {
    margin: 30px auto 0;
    justify-content: center;
  }
}
</style>
