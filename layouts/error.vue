<template>
  <div class="contianer">
    <div class="wrap">
      <h1><span class="first-line">Oops!</span></h1>
      <h2>somtething went wrong</h2>
      <h2 class="second-line">
        you can
        <button @click="$router.push('/')" class="go-home fz-xxl">go home</button>
        or
        <button @click="login" class="go-home fz-xxl">login</button>
      </h2>
      <!-- <div class="ctrl-bar fz-xxl">
        <button class="go-home fz-xxl">go home</button>
        <button class="go-back fz-m">go back</button>
      </div> -->
    </div>
    <div class="img-box">
      <img src="~/assets/images/error.png" alt="err-pic" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'global',
  methods: {
      login(){
          window.open(`http://auth.hyong1232.com:8083?type=login&refer=${location.href}`, '_self')
      }
  }
}
</script>
<style lang="scss" scoped>
.contianer {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    .ctrl-bar {
      button {
        font-weight: 700;
        &:hover {
          cursor: pointer;
          color: var(--bg-main-weak-color);
          text-decoration: underline;
        }
        margin-right: 10px;
        border: none;
        height: 38px;
        border-radius: 4px;
        color: var(--bg-main-color);
        background: transparent;
      }
    }
    .first-line {
      background: -webkit-linear-gradient(
        315deg,
        var(--bg-secondary-color) 25%,
        var(--bg-blue-color)
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .second-line {
      button {
        font-weight: 700;
        &:hover {
          cursor: pointer;
          color: var(--bg-main-weak-color);
          text-decoration: underline;
        }
        margin-right: 10px;
        border: none;
        height: 38px;
        border-radius: 4px;
        color: var(--bg-main-color);
        background: transparent;
      }
    }
  }
}
</style>
