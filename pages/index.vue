<template>
  <div class="hy-blog-container">
    <div class="mode-ctrl-bar">
      <div
        class="item"
        @click="activeMode = 'list'"
        :class="{ active: activeMode === 'list' }"
      >
        <i class="iconfont icon-list-mode fz-l"></i>
        列表模式
      </div>
      <div
        class="item"
        @click="activeMode = 'card'"
        :class="{ active: activeMode === 'card' }"
      >
        <i class="iconfont icon-card-mode fz-l"></i>
        卡片模式
      </div>
    </div>
    <div class="bg-card" v-if="activeMode === 'list'">
      <div class="card-wrap" v-for="a in article" :key="a._id">
        <blog-list-card :data="{ bgc: '' }"></blog-list-card>
      </div>
    </div>
    <div class="bg-list" v-if="activeMode === 'card'">
      <div class="list-item">
        <blog-card-cover></blog-card-cover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Index extends Vue {

  activeMode = 'list'

  layout() {
    return 'global'
  }

  async asyncData({ app, $http }: any) {
    try {
        const res = await app.$http.article() 
      return {article: res.data}
    } catch (error) {
      error({ statusCode: '404', message: 'not found', detail: 'not found' })
    }
  }
}
</script>
<style lang="scss" scoped>
.hy-blog-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .bg-card {
    width: 100%;
    .card-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
  .bg-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-item {
      width: 48%;
      display: flex;
      align-items: center;
    }
  }
  .mode-ctrl-bar {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 20px;
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
      &.active {
        color: var(--bg-main-color);
        background-color: var(--bg-main-weak-color);
      }
      .iconfont {
        margin: 6px;
      }
    }
  }
}
</style>
