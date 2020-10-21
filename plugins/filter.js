import Vue from 'vue'

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
  if (value && value.length >= 6) {
    return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`
  } else {
    return value
  }
})
