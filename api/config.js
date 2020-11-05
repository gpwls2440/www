import axios from 'axios'
import qs from 'qs'

// const host = `${location.protocol}//${location.host}`
const host = 'http://localhost:8080'

export const axiosPost = (url, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(host + url, qs.stringify(params))
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

export const axiosGet = (url, resType) => {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'GET',
      url: host + url,
      responseType: resType
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
