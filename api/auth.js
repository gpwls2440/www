import { axiosGet } from './config'

export const popupNotiList = () => {
  return axiosGet('/auth/mainPopup', {})
}
