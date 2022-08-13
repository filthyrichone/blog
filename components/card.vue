<template>
  <div class="hy-card-box">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Card extends Vue {}
</script>
<style lang="scss" scoped>
.hy-card-box {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 #0000001a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  .card-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
