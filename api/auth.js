import { axiosGet, axiosPost } from './config'

export const popupNotiList = () => {
  return axiosGet('/auth/mainPopup', {})
}

export const Login = (userId = '', userPw = '') => {
  return axiosPost('/auth/loginProc', {
    userId,
    userPw
  })
}

export const LoginCertProc = (certNumber = '', uid = '', level ='', bw='') => {
  return axiosPost('/auth/loginCertProc', {
    certNumber,
    uid,
    level,
    bw
  })
}
