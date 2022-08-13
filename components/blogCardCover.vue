<template>
  <div class="bg-cd-cover" :style="{backgroundImage: data.bgc || 'https://s2.loli.net/2022/05/21/efMHFTvLIq9Jkc2.jpg'}">
    <a class="title">
        <p class="text fz-xxl">{{data.title}}</p>
    </a>
    <div class="description">
        <p>{{data.description}}</p>
    </div>
    <a href="" class="readmore">
        <i class="iconfont icon-eye"></i>
        <div class="text">阅读更多</div>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
})
export default class BlogCardCover extends Vue{
    @Prop({default: () => {}}) data?: object;
}
</script>
<style lang="scss" scoped>
.bg-cd-cover{
    opacity: 1;
    transform: translate(0) scale(1);
    transition: all .1s cubic-bezier(0.445, 0.05, 0.55, 0.95) .7s;
    width: 520px;
    height: 300px;
    border-radius: 4px;
    box-shadow:0 0 4px 3px #efecec;
    color: white;
    margin: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .title {
        .text {
            color: white;
        }
    }
    .description {
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        margin: 10px 0;
    }
    .readmore {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        margin: 0.6rem 0;
        line-height: 40px;
        background-image: linear-gradient(135deg, #d5e7e8, #0aafff);
        border-radius: 30px;
        width: 120px;
    }
}
</style>