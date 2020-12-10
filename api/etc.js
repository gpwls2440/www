import { axiosGet } from './config'

export const popupNotiList = () => {
  return axiosGet('/auth/mainPopup', {})
}

export const mainNotiTitle = () => {
  return axiosGet('/api/notiTitle', {})
}
