import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import ko from './i18n/ko.json'
import en from './i18n/en.json'

// import {getCookie} from '../utils/util'
const getCookie = name => {
  const parts = `; ${document.cookie}`.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

let locale = getCookie('lang')
if (!locale) {
  locale = 'ko'
}
document.documentElement.setAttribute('lang', locale)

Vue.use(Vuei18n)

const messages = {
  ko,
  en
}

export const i18n = new Vuei18n({
  locale,
  messages
})

// export default messages
