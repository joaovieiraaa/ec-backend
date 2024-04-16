import { defineStore } from "pinia";

export const appStore = defineStore("app", {
  state() {
    return {
      formOnSubmit: false,
    };
  },
  actions: {},
});
