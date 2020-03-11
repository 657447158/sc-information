<template>
  <div class="page-banner">
    <p class="page-title">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: String
    }
  }
</script>
<style lang="scss" scoped>
  .page-banner {
    position: relative;
    width: 100%;
    height: 800px;
  }
  .page-title {
    position: absolute;
    bottom: 60px;
    left: 50%;
    color: #fff;
    font-size: 46px;
    font-weight: bold;
    transform: translateX(-50%);
  }
</style>
