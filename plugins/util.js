export const repComma = num => {
  num = String(num)
  return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const repUnComma = num => {
  num = String(num)
  return num.replace(/[^\d]+/g, '')
}
