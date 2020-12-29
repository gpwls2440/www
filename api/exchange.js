import { axiosPost } from './config'

// 체결추이
export const tickList = (symbol = '') => {
  return axiosPost('/app/tickList', {
    symbol: symbol
  })
}

// 거래내역
export const transactionList = (sessionId, uid, startDt, endDt, transTp, instCd, page, pageSize) => {
  return axiosPost('/auth/transactionHistory', {
    sessionId,
    uid,
    startDt,
    endDt,
    transTp,
    instCd,
    page,
    pageSize
  })
}

// 미체결내역
export const nonTransactionList = () => {
  return axiosPost('/auth/matchingReady', {
  })
}
