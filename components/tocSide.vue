<template>
  <div class="toc-side-box">
    <card>
        <template #header>
            <div class="title">
                <i class="iconfont icon-toc fz-xxl"></i>
                <div class="text fz-xl">目录</div>
            </div>
        </template>
        <template>
            <ul class="toc-content">
                <li class="toc-item fz-l" v-for="t in toc" :key="t.id">
                    <NuxtLink :to="`#${t.id}`">{{t.text}}</NuxtLink>
                </li>
            </ul>
        </template>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
   
})
export default class TocSide extends Vue{
    @Prop() toc!: Object;
}
</script>
<style lang="scss" scoped>
.toc-side-box{
    .toc-content {
        margin: 0;
        .toc-item {
            margin-bottom: 10px;
            list-style: none;
        }
        width: 100%;
    }
    .title {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .text {
            margin: 10px 0;
        }
    }
}
</style>