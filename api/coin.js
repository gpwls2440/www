import { axiosGet } from './config'

export const coinList = () => {
  return axiosGet('/api/coinList', {})
}
