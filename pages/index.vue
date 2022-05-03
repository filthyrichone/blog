<template>
  <div class="wrapper">
    <comments :article="article" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
})
export default class Index extends Vue {
  article: any = {}

//   async fetch({ store, app }: any) {
//     try {
//       const res = await app.$http.article('62528b09d5ea787435d43203')
//       this.article = res
//     } catch (error) {
//       error({ statusCode: '404', message: 'not found', detail: 'not found' })
//     }
//   }
  layout() {
    return 'global';
  }
  async asyncData({ $axios, error, store, app }: any) {
    try {
      const res = await app.$http.article('62528b09d5ea787435d43203')
      return { article: res }
    } catch (error) {   
      error({ statusCode: '404', message: 'not found', detail: 'not found' })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
}
</style>
