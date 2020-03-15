<template>
  <div class="footer">
		<div class="main">
      <div class="link-box">
        <span class="daq-icon">&#xe709;</span>
        <span class="daq-icon">&#xe67a;</span>
        <span class="daq-icon">&#xe69b;</span>
      </div>
      <p class="copy-right">Copyright © 2019 Chengdu Tourism Bureau All Rights Reserved</p>
    </div>
	</div>
</template>
<style lang="scss" scoped>
.footer {
  padding: 65px 0;
  width: 100%;
  height: 220px;
  font-size: 16px;
  color: #666;
  background: #dfdfdf;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .link-box {
    display: flex;
    span {
      width: 50px;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #c6c6c6;
      &:not(:last-child) {
        border-right: none;
      }
    }
  }
  .copy-right {
    margin-top: 30px;
    font-size: 16px;
    color: #333;
    text-align: center;
  }
}
</style>
