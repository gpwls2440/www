export const state = () => ({
  locales: ['ko', 'en'],
  locale: 'ko',
  uid: '',
  sessionId: '',
  userLevel: '',
  symbolMarket: 'BTC_KRW'
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  setUid(state, data) {
    state.uid = data
  },
  setSessionId(state, data) {
    state.sessionId = data
  },
  setUserLevel(state, data) {
    state.userLevel = data
  },
  setSymbolMarket(state, data) {
    state.symbolMarket = data
  }
}

export const actions = {
  setSymbolMarketFunc(context, data) {
    return context.commit('setSymbolMarket', data)
  },
  clearUserFunc(context, data) {
    context.commit('setUid', data)
    context.commit('setSessionId', data)
    context.commit('setUserLevel', data)
  }
}

export const getters = {
  getUid(state) {
    return state.uid
  },
  getSessionId(state) {
    return state.sessionId
  },
  getUserLevel(state) {
    return state.userLevel
  },
  getSymbolMarket(state) {
    return state.symbolMarket
  }
}
