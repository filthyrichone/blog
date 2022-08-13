<template>
  <div class="home">
    <div class="top-nav">
      <top />
    </div>
    <div class="container">
      <div class="sub-menu">
        <slot name="subMenu"></slot>
      </div>
      <div class="content">
        <nuxt />
      </div>
      <div class="sidebar">
        <slot name="sidebar"></slot>
      </div>
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
  .sidebar {
    border-radius: 4px;
    margin: 10px;
    width: 20%;
  }
  .sub-menu {
    border-radius: 4px;
    margin: 10px;
    width: 20%;
  }
  .content {
    margin: 10px;
    padding: 0 20px 10px;
    border-radius: 4px;
    background-color: #fff;
    width: 60%;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  background-color: #f9f9f9;
  width: 100%;
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
