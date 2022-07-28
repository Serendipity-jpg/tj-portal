import { defineStore } from 'pinia';

export const dataCacheSrore = defineStore('notification', {
  state: () => ({
    askDetails: '22',
  }),
  getters: {
    getAskDetails: state => state.askDetails,
  },
  actions: {
    setAskDetails(data) {
      this.askDetails = data;
    },
  },
});
