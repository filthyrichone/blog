<template>
  <div class="list-card-box">
    <div class="left-entry">
      <div class="title fz-xl">title</div>
      <div class="descreption fz-l">descreption ........</div>
      <div class="other-info fz-m">date 2020-2-12</div>
    </div>
    <div class="right-entry">
      <div class="img"><img src="https://s2.loli.net/2022/05/22/BACj4imJNWzo2Lk.jpg" alt="coverImage" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class ListCard extends Vue {}
</script>
<style lang="scss" scoped>
.list-card-box {
  &:hover {
    cursor: pointer;
    .left-entry {
      transform: translateX(4px);
      transition: transform 0.2s;
    }
    .right-entry {
      opacity: 1;
      transform: translateX(-4px);
      transition: all 0.2s;
    }
  }
  .right-entry {
    opacity: 0.1;
    transform: translate(0);
    transition: all  0.2s;
    width: 30%;
    height: 100%;
    .img {
      height: 100%;
      position: relative;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        content: '';
        box-shadow: 0 -30px 20px 50px #fff;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .left-entry {
    transform: translate(0);
    transition: transform 0.2s;
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .other-info {
      color: var(--bg-text-color);
    }
    .descreption {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      marign: 10px 0;
    }
    .title {
      height: 30px;
    }
  }
  height: 140px;
  width: 100%;
  display: flex;
  border: 1px solid var(--bg-spare-color);
}
</style>
