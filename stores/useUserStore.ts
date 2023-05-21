import { defineStore } from "pinia";

interface IState {
  user: Object | undefined
}

export const useUserStore = defineStore('userStore', {
  state: (): IState => {
    return {
      user: undefined
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
})