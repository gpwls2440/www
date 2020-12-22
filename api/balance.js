import { axiosPost, axiosGet } from './config'

// 주문 자산 가져오기
export const orderAsset = (sessionId = '', uid = '', symbolMarket = '') => {
  return axiosPost('/exchange/assets', {
    sessionId: sessionId,
    uid: uid,
    symbol: symbolMarket 
  })
}

// 전송수수료 계산
export const sendFee = (symbol = '', procType= '', calcType = '') => {
  return axiosPost('/auth/getSendFee', {
    symbol: symbol,
    procType: procType,
    calcType: calcType
  })
}

// 보유코인

export const myCoins = () => {
  return axiosGet('/auth/walletList', {})
}

