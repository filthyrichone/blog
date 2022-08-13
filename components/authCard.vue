<template>
  <div class="sub-menu-box">
    <card>
      <template #header v-if="authorInfo">
        <div class="img">
          <img :src="authorInfo.avatar" alt="auth-avatar" />
        </div>
      </template>
      <template v-if="authorInfo">
        <div class="info-wrap">
          <div class="uname fz-xxl">{{ authorInfo.username }}</div>
          <div class="describe-text fz-m">
            {{ authorInfo.describe }}
          </div>
          <div class="author-info">
            <div class="info-item" v-for="(item, i) in infoArr" :key="i">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AuthCard extends Vue {
  @Prop({})
  authorInfo?: Object

  infoArr = [
    { name: '文章', value: 0 },
    { name: '分类', value: 0 },
    { name: '标签', value: 0 },
    { name: '字数', value: 0 },
  ]
}
</script>
<style lang="scss" scoped>
.sub-menu-box {
  .info-wrap {
    width: 100%;
    .author-info {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
    }
    .describe-text {
      margin-bottom: 10px;
    }
    .uname {
      margin-bottom: 10px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    width: 80px;
    height: 80px;
    img {
      border-radius: 50%;
      width: 100%;
    }
  }
}
</style>
