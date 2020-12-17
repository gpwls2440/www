import { axiosPost, axiosGet } from './config'

/**
 * 로그인
 */
export const Login = (userId = '', userPw = '') => {
  return axiosPost('/auth/loginProc', {
    userId,
    userPw
  })
}

/**
 * 로그인 인증번호 발송
 */
export const LoginCertProc = (certNumber = '', uid = '', level ='', bw='') => {
  return axiosPost('/auth/loginCertProc', {
    certNumber,
    uid,
    level,
    bw
  })
}

/**
 * 로그인 인증번호 재발송
 */
export const CertReSend = (uid = '') => {
  return axiosPost('/auth/reSendCert', {
    uid
  })
}

// 로그아웃
export const Logout = () => {
  return axiosGet('/auth/logout', {})
}
