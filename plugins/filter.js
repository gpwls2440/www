import Vue from 'vue'

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
