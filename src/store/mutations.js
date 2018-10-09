export default {
  // 更新金币
  UPDATE_USER_GOLD: (state, val) => {
    state.userInfo.coin += val
  },
  // 更新抽奖次数
  UPDATE_USER_lOTTERY_NUM: (state, val) => {
    state.userInfo.lotteryNum += val
  },
  USER_INFO: (state, data) => {
    state.userInfo = {
      uid: data.uid,
      coin: data.activity_coin,
      dateTime: data.dateTime,
      dateList: data.dateList,
      currentDay: data.currentDay,
      havaMessage: data.isShow
    }
  },
  SET_LOAD_STATE: (state) => {
    state.loadingState = false
  },
  SET_PRIZE_ID: (state, id) => {
    state.prizeID = id
  },
  SHOW_MY_PRIZE: (state) => {
    state.getBackToMyPrize = true
  },
  NOT_SHOW_MY_PRIZE: (state) => {
    state.getBackToMyPrize = false
  }
}
