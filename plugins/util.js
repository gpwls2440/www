export const repComma = num => {
  num = String(num)
  const dotIndex = num.indexOf('.')
  if (dotIndex > -1) {
    const convertVal = num.substring(0, dotIndex).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const remainingVal = num.substring(dotIndex)
    return `${convertVal}${remainingVal}`
  } else {
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }
}

export const repUnComma = num => {
  num = String(num)
  const dotIndex = num.indexOf('.')
  if (dotIndex > -1) {
    const convertVal = num.substring(0, dotIndex)
    return convertVal.replace(/[^\d]+/g, '')
  } else {
    return num.replace(/[^\d]+/g, '')
  }
}

export const getSymbol = value => {
  const arr = value.split('_')
  return arr[0]
}

export const getMarket = value => {
  const arr = value.split('_')
  return arr[1]
}

export const toFixQty = value => {
  let out = ''
  out = value.toFixed(3)
  return out
}

export const calcPrice = (input, val1) => {
  const basic = Number(repUnComma(input))
  const price = Number(repUnComma(val1))
  let out = Number(price) * Number(basic)
  out = Math.round(out)
  return out
}
