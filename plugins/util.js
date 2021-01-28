export const repComma = num => {
  num = String(num)
  return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const repUnComma = num => {
  num = String(num)
  return num.replace(/[^\d]+/g, '')
}

export const getSymbol = value => {
  const arr = value.split('_')
  return arr[0]
}

export const getMarket = value => {
  const arr = value.split('_')
  return arr[1]
}
