<template>
  <div class="sub-menu-box">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  computed: {
    ...mapGetters({ authorInfo: 'getUserInfo' }),
  },
})
export default class SubMenu extends Vue {}
</script>
<style lang="scss" scoped>
.sub-menu-box {
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
