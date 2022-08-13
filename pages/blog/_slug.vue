<template>
  <div class="article-box">
    <div class="sub-menu">
      <sub-menu>
        <auth-card :authorInfo="articleInfo.author"></auth-card>
      </sub-menu>
    </div>
    <div class="content">
        <div class="article-header">
            <div class="category-info">
            <div class="category"></div>
            <div class="tag"></div>
            </div>
            <div class="public-info">
                <div class="public-date"></div>
                <div class="update-date"></div>
                <div class="article-word"></div>
                <div class="read-time"></div>
                <div class="reader-num"></div>
            </div>
        </div>
       <div class="split-line"></div>
      <article>
        <nuxt-content :document="article"></nuxt-content>
      </article>
      <comments :article="articleInfo" />
    </div>
    <div class="sidebar">
      <sidebar>
        <toc-side :toc="article.toc"></toc-side>
      </sidebar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Slug extends Vue {
  layout() {
    return 'blog'
  }
  async asyncData({ $content, params, app }: any) {
    try {
      const articleDoc = await $content('articles', params.slug).fetch()
      const res = await app.$http.article('61fd29dd0ee827fd8713fc6e')
      return { article: articleDoc, articleInfo: res }
    } catch (error) {
      error({ statusCode: '404', message: 'not found', detail: 'not found' })
    }
  }
}
</script>
<style lang="scss" scoped>
.article-box {
  width: 100%;
  height: calc(100vh - 124px);
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  .sidebar {
    border-radius: 4px;
    margin: 10px 15px;
    width: 25%;
  }
  .sub-menu {
    border-radius: 4px;
    margin: 10px 15px;
    width: 20%;
  }
  .content {
    width: 55%;
    box-shadow: 0 2px 12px 4px #0000001a;
    width: 100%;
    margin: 10px 0;
    background-color: #fff;
    padding: 0 20px 10px;
    border-radius: 4px;
    background-color: #fff;
    ::v-deep.icon.icon-link {
      display: none;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
    }
  }
}
</style>
