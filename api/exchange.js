import { axiosPost } from './config'

// 체결추이
export const tickList = (symbol = '') => {
  return axiosPost('/app/tickList', {
    symbol: symbol
  })
}
    