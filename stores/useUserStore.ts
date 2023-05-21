import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => {
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