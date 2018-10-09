export default {
  coin: state => {
    return state.userInfo.coin
  },
  lotteryNum: state => {
    return state.userInfo.lotteryNum
  },
  havaMessage: state => {
    return state.userInfo.havaMessage
  },
  dateTime: state => {
    return state.userInfo.dateTime
  },
  dateList: state => {
    return state.userInfo.dateList
  },
  currentDay: state => {
    return state.userInfo.currentDay
  },
  uid: state => {
    return state.userInfo.uid
  },
  loadingState: state => {
    return state.loadingState
  }
}
