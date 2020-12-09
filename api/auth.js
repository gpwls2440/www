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
