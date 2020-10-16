export const Comma = (num) => {
    num = String(num)
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }
  
  export const UnComma = (num) => {
    num = String(num)
    return num.replace(/[^\d]+/g, '')
  }