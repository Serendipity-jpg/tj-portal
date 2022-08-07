import { defineStore } from 'pinia';

export const dataCacheStore = defineStore('notification', {
  state: () => ({
    searchKey: '',
    askDetails: '22',
  }),
  getters: {
    getAskDetails: state => state.askDetails,
    getSearchKey: state => state.searchKey,
  },
  actions: {
    setAskDetails(data) {
      this.askDetails = data;
    },
    setSearchKey(data) {
      this.searchKey = data;
    },
  },
});
