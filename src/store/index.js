import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: {
    uid: -1,
    coin: 0,
    havaMessage: 1,
    dateTime: '',
    dateList: '',
    currentDay: 0,
    lotteryNum: 0
  },
  prizeID: Number,
  getBackToMyPrize: false,
  loadingState: true
}

export default function createStore () {
  return new Vuex.Store({
    actions,
    getters,
    mutations,
    state
  })
}
