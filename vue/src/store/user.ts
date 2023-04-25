import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ user: "Xavier", token: "token" }),
  getters: {
    full: (state) => `${state.user} - ${state.token}`,
  },
  actions: {},
});
