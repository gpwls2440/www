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
export const CertReSend = (uid) => {
  return axiosPost('/auth/reSendCert', {
    uid
  })
}

// 로그아웃
export const Logout = () => {
  return axiosGet('/auth/logout', {})
}

// 아이디 찾기
export const FindId = (val = '') => {
  return axiosPost('/auth/findIdProc', {
    val: val
  })
}

// 비밀번호 찾기
export const FindPw = (userId) => {
  return axiosPost('/auth/findPwProc', {
    userId
  })
}

// 비밀번호 재설정
export const FindPwResetInit = (p) => {
  return axiosPost('/auth/pwdReset', {
    p
  })
}

// 비밀번호 재설정
export const FindPwResetProc = (userpswd, uid) => {
  return axiosPost('/auth/updatePwProc', {
    userpswd,
    uid
  })
}

