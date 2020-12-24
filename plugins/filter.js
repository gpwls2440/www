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

Vue.filter('hhmmssFilter', function (value) {
  console.log('value.length: ' + value.length)
  console.log('typeof value.length: ' + typeof value.length)
  if (value && value.length === 6) {
    return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`
  } else if (value && value.length === 14) {
    return `${value.substring(8, 10)}:${value.substring(10, 12)}:${value.substring(12, 14)}`
  } else {
    return value
  }
})

Vue.filter('dateAndTimeFilter', function (value) {
  if (value) {
    const date = value.substring(0, 8)
    const time = value.substring(8)

    return `${date.substring(0, 4)}.${date.substring(4, 6)}.${date.substring(6, 8)} ${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`
  }
})

Vue.filter('dateAndTimeFilter2', function (value) {
  if (value) {
    const date = value.substring(0, 8)
    const time = value.substring(8)

    return `${date.substring(2, 4)}.${date.substring(4, 6)}.${date.substring(6, 8)}${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`
  }
})

Vue.filter('askbidHeight', function (value, index) {
  const centerH = 53
  const itemH = 26

  // const topH = jQuery('#right_section .top').height()
  const topH = 558

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

Vue.filter('toFixed2', function (value) {
  if (value) {
    return Number(value).toFixed(2)
  }
})

Vue.filter('calcPrice', function (input, val1) {
  const basic = Number(repUnComma(input))
  const price = Number(val1)
  let out = Number(price) * Number(basic)
  out = Math.round(out)
  return repComma(out)
})
