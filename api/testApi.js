import { axiosPost } from './config'

export const testApi = userId => {
  return axiosPost('/posts', {
    user_id: userId
  })
}
