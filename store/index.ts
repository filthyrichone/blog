import { SAVE_USERINFO } from '@/store/commet.types'

export const state = () => {
  return {
    userInfo: {},
  }
}

export const getters = {
  getUserInfo(state: any): object {
    return state.userInfo
  },
}

export const actions = {
  async userInfo({ commit }: any, id?: string): Promise<any> {
    try {
      const res = await (this as any).$http.getUserInfo(id)
      commit(SAVE_USERINFO, res)
      return true;
    } catch (error) {
      throw new Error(error as string)
    }
  },
}

export const mutations = {
  [SAVE_USERINFO](state: any, payload: any): void {
    state.userInfo = payload
  },
}
