import Vue from 'vue'
import { repComma, repUnComma } from './util'

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

Vue.filter('commaFilter', function (value) {
  if (value) {
    if (typeof value === 'number') {
      value = value.toString()
    }
    const dotIndex = value.indexOf('.')
    if (dotIndex > -1) {
      const convertVal = value.substring(0, dotIndex).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      const remainingVal = value.substring(dotIndex)
      return `${convertVal}${remainingVal}`
    } else {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  } else {
    return '0'
  }
})

Vue.filter('yyyymmddFilter', function (value) {
  if (value && value.length >= 8) {
    return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`
  } else {
    return value
  }
})

Vue.filter('hhmmssFilter', function (value, index) {
  if (value && value.length >= 6) {
    return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`
  } else {
    return value
  }
})

Vue.filter('askbidHeight', function (value, index) {
  const centerH = 53
  const itemH = 26

  const topH = $('#right_section .top').height()

  let count = (Number(topH) - Number(centerH)) / 2 / itemH
  const countString = count + ''
  let sosu = 0
  if (countString.includes('.')) {
    sosu = Number('0.' + countString.split('.')[1])
  }

  count = Math.floor(count)

  let askcount = 10 - count
  let bidcount = count - 1

  const abs = sosu - 0.5

  if (abs > 0) {
    askcount = 9 - count
  }

  if (Math.abs(abs) > 0.2) {
    bidcount = count
  }
  if (value.dealType === 'ask') {
    if (Number(index) > askcount) {
      return value
    }
  } else if (Number(index) < bidcount) {
    return value
  }
})

Vue.filter('cutSymbol', function (input) {
  let out = input
  if (input.indexOf('_') > 0) {
    const tmp = input.split('_')
    out = tmp[0]
  }
  return out
})

Vue.filter('toFixMarket', function () {
  return function (input, coinMarket) {
    input = repUnComma(input)
    let out
    if (coinMarket === 'KRW') {
      let underCount = 2
      if (Number(repUnComma(input)) >= 100) {
        underCount = 0
      } else if (Number(repUnComma(input)) >= 10) {
        underCount = 1
      }

      out = input.toFixed(underCount)
    } else {
      out = input.toFixed(8)
    }
    return repComma(out)
  }
})
