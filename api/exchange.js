import { axiosPost, axiosGet } from './config'

// 체결추이
export const tickList = (symbol = '') => {
  return axiosPost('/app/tickList', {
    symbol: symbol
  })
}

// 거래내역
export const transactionList = (sessionId, uid, startDt, endDt, tranTp, instCd, page, pageSize) => {
  return axiosPost('/auth/transactionHistory', {
    sessionId,
    uid,
    startDt: startDt.replace(/[-]/g, ''),
    endDt: endDt.replace(/[-]/g, ''),
    tranTp,
    instCd,
    page,
    pageSize
  })
}

// 미체결내역
export const nonTransactionList = (sessionId, uid, symbol) => {
  return axiosPost('/auth/matchingReady', {
    sessionId,
    uid,
    symbol
  })
}

// 투자손익
export const profitList = (sessionId, uid, startDt, endDt) => {
  return axiosPost('/auth/profitList', {
    sessionId,
    uid,
    startDt: startDt.replace(/[-]/g, ''),
    endDt: endDt.replace(/[-]/g, '')
  })
}

// 거래소 - 거래내역
export const exTransactionList = (sessionId, uid, symbol) => {
  return axiosPost('/auth/matchingList', {
    sessionId,
    uid,
    symbol
  })
}
