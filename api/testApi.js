import { axiosGet } from './config'

export const testApi = () => {
  return axiosGet('/test', {})
}
