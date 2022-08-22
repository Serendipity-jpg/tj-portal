import { defineStore } from 'pinia';

export const dataCacheStore = defineStore('notification', {
  state: () => ({
    searchKey: '',
    askDetails: '22',
    learingDataes:{
      classDetailsData:{}, //课程详情的信息 - 打开课程详情时写入 
      teacherData:{}, // 讲师信息 - 打开课程详情时写入 
      planData:{} // 课程计划信息 
    }
  }),
  getters: {
    getAskDetails: state => state.askDetails,
    getSearchKey: state => state.searchKey,
    getLearingDataes: state => state.learingDataes,
  },
  actions: {
    setAskDetails(data) {
      this.askDetails = data;
    },
    setSearchKey(data) {
      this.searchKey = data;
    },
    setLearingDataes(data) {
      console.log(data.teacherData)
      this.learingDataes = data;
    },
  },
  persist: {
    enabled: true,
    encryptionKey: 'data-catch',
  }
});
