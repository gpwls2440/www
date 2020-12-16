import { axiosGet, axiosPost } from './config'

// 코인리스트
export const coinList = () => {
  return axiosGet('/api/coinList', {})
}

// 즐겨찾기 코인
export const favCoinList = () => {
  return axiosGet('/ajax/favCoinList', {})
}

// 즐겨찾기 코인 추가 및 삭제
export const favCoinFunc = (symbol = '', type = '') => {
  return axiosPost('/ajax/favCoinProc', {
    symbol: symbol,
    type: type
  })
}

// 코인정보
export const coinInfo = (symbolMarket = '') => {
  return axiosPost('/exchange/coinInfo', {
    symbol: symbolMarket
  })
}
