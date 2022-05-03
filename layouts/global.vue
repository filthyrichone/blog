<template>
  <div class="home">
    <div class="top-nav">
      <top />
    </div>
    <div class="container">
      <div class="sub-menu">
        <!-- TODO sub menu area -->
      </div>
      <div class="content">
        <nuxt />
      </div>
      <div class="sidebar">
        <!-- TODO sidebar -->
      </div>
    </div>
    <div class="footer">
      <g-footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-nav {
  height: 80px;
  min-height: 64px;
  position: relative;
  margin: 0 auto;
  max-width: 2560px;
  width: 100%;
}
.container {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  .content {
    margin: 0 auto;
    width: 80%;
  }
}
.footer {
  background-color: #f9f9f9;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
