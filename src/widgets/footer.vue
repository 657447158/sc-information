<template>
  <div class="footer">
		<div class="main">
      <div class="link-box">
        <a class="daq-icon" href="https://www.facebook.com/tsichuan/" target="_blank">&#xe709;</a>
        <a class="daq-icon" href="https://twitter.com/Amazingsichuan" target="_blank">&#xe67a;</a>
        <a class="daq-icon" href="https://www.instagram.com/visit_sichuan/" target="_blank">&#xe69b;</a>
      </div>
      <p class="copy-right">Copyright &copy;2019 Sichuan Culture and Tourism information Center All Rights Reserved</p>
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
    a {
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
