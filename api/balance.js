import { axiosPost } from './config'

// 주문 자산 가져오기
export const orderAsset = (sessionId = '', uid = '', symbolMarket = '') => {
  return axiosPost('/exchange/assets', {
    sessionId: sessionId,
    uid: uid,
    symbol: symbolMarket 
  })
}

// 전송수수료 계산
export const sendFee = (symbol = '', procType= '', calcType = '', gasLimit = '', gwei = '') => {
  return axiosPost('/auth/getSendFee', {
    symbol: symbol,
    procType: procType,
    calcType: calcType,
    gasLimit: gasLimit,
    gwei: gwei
  })
}

// 보유코인
export const myCoins = (symbol='', type= '' , sessionId = '', uid = '') => {
  return axiosPost('/auth/walletList', {
    symbol: symbol,
    type: type,
    sessionId: sessionId,
    uid: uid
  })
}

// market이 KRW일때 자산현황
export const userAmount = (market, symbol, sessionId, uid) => {
  return axiosPost('/auth/userAmount', {
    market,
    symbol,
    sessionId,
    uid
  })
}

// market이 KRW이 아닐때 자산현황
export const userAbleAmount = (market, symbol, sessionId, uid) => {
  return axiosPost('/auth/userAbleAmount', {
    market,
    symbol,
    sessionId,
    uid
  })
}
