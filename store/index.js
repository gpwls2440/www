export const state = () => ({
  locales: ['ko', 'en'],
  locale: 'ko',
  uid: '',
  sessionId: '',
  userLevel: ''
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
  }
}
