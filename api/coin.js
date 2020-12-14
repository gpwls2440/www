import { axiosGet } from './config'

// 코인리스트
export const coinList = () => {
  return axiosGet('/api/coinList', {})
}

// 즐겨찾기 코인
export const favCoinList = () => {
  return axiosGet('/ajax/favCoinWebList', {})
}

// 즐겨찾기 코인 추가 및 삭제
export const favCoinFunc = (symbol = '', type = '') => {
  return axiosGet('/ajax/favCoinWebProc', {
    symbol,
    type
  })
}