import Vue from 'vue'
export default function ({ app }: any) {
  Vue.directive('eventListener', {
    bind(el, bunding) { },
    unbind(el, bunding) {},
  })
}
