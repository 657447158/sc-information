<template>
  <div class="footer">
		<div class="main">
      <ul>
        <li>
          <span class="daq-icon">&#xe666;</span>
          <span>Tourist VISA</span>
        </li>
        <li>
          <span class="daq-icon">&#xe66f;</span>
          <span>City traffic</span>
        </li>
        <li>
          <span class="daq-icon">&#xe66c;</span>
          <span>Hotel accomodation</span>
        </li>
        <li>
          <span class="daq-icon">&#xe675;</span>
          <span>Travel agency inquiry</span>
        </li>
        <li>
          <span class="daq-icon">&#xe672;</span>
          <span>Caring service</span>
        </li>
        <li>
          <span class="daq-icon">&#xe668;</span>
          <span>Health and life safety</span>
        </li>
      </ul>
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
  padding: 90px 0;
  width: 100%;
  height: 500px;
  font-size: 16px;
  color: #666;
  background: #dfdfdf;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ul {
    padding-left: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 18px;
      color: #333;
      &:nth-child(2) { margin-left: 100px; }
      &:nth-child(3) { margin-left: 80px; }
      &:nth-child(4) { margin-left: 46px; }
      &:nth-child(5) { margin-left: 60px; }
      &:nth-child(6) { margin-left: 60px; }
    }
    .daq-icon {
      margin-bottom: 26px;
      width: 120px;
      height: 120px;
      color: #333;
      font-size: 50px;
      text-align: center;
      line-height: 120px;
      border: 1px solid #999;
    }
  }
  .link-box {
    margin-top: 60px;
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
