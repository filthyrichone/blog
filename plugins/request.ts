import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue from 'vue'
import reqlist from './reqlist'

export default function ({ $axios, app }: any, inject: any) {
  ;($axios as NuxtAxiosInstance).interceptors.response.use(
    (res: any) => {
      return res
    },
    (err: any) => {
      const status = err.response && err.response.status
      if (status === 401 || status === 403) {
        Vue.prototype.$message({
          type: 'error',
          message: 'userInfo expired,login please',
        })
      } else if (status === 500) {
        Vue.prototype.$message({
          type: 'error',
          message: 'server error',
        })
      }
      return Promise.reject(err);
    }
  )
  const axios = (config: object) => {
    return new Promise((resolve, reject) => {
      let loading: any
      if (Vue.prototype.$loading) {
        loading = Vue.prototype.$loading({
          body: true,
          fullscreen: true,
          text: 'loading...',
        })
      }
      $axios(config)
        .then((res: any) => {
          loading && loading.close()
          resolve(res.data)
        })
        .catch((e: Error) => {
          console.error(e)
          Vue.prototype.$message({
            type: 'error',
            message: e.message || 'error',
          })
          loading && loading.close()
        })
    })
  }
  const req = reqlist(axios)
  inject('http', req)
}   
