<template>
  <div class="home">
    <div class="top-nav">
      <top />
    </div>
    <div class="container">
      <nuxt />
    </div>
    <div class="footer">
      <g-footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-nav {
  min-height: 64px;
  position: relative;
  margin: 0 auto;
  max-width: 2560px;
  width: 100%;
}
.container {
  background-color: var(--bg-mainbg-color);
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 60px;
}
.footer {
  position: fixed;
  bottom: 0;
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
