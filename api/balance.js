import { axiosPost } from './config'

// 주문 자산 가져오기
export const orderAsset = (symbolMarket = '') => {
  return axiosPost('/exchange/assets', {
    symbol: symbolMarket  
  })
}
  