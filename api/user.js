import { axiosPost } from './config'

// 마이페이지 회원정보조회
export const userInfo = (sessionId, uid) => {
  return axiosPost('/app/getUserInfo', {
    sessionId,
    uid
  })
}

// 마이페이지 > 비밀번호 수정 > 비밀번호 체크
export const chkPwd = (sessionId, uid) => {
  return axiosPost('/mypage/checkPw', {
    sessionId,
    uid
  })
}
