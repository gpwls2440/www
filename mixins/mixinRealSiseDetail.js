import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import { getSymbol } from '~/plugins/util'

const mixinRealSiseDetail = {
  data() {
    return {
      realCoinInfo: {},
      symbol: ''
    }
  },
  created() {
    this.connect()
  },
  methods: {
    connect() {
      if (process.client) {
        // const serverURL = `${location.protocol}//${location.host}`
        const serverURL = 'http://localhost:8080'
        const socket = new SockJS(serverURL)
        this.stompClient = Stomp.over(socket)
        // console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
        this.stompClient.connect(
          'mylogin',
          'mypasscode',
          frame => {
            // 소켓 연결 성공
            this.connected = true
            // console.log('소켓 연결 성공', frame)
            // 서버의 메시지 전송 endpoint를 구독합니다.
            // 이런형태를 pub sub 구조라고 합니다.
            const symbolMarket = getSymbol(this.getSymbolMarket)
            console.log('symbolMarket: ============== ' + symbolMarket)
            this.stompClient.subscribe(`/rsv/coinDetail/${symbolMarket}`, res => {
              // this.symbol = res.body.symbol
              this.realCoinInfo = JSON.parse(res.body)
              console.log('구독으로 받은 메시지 입니다.', JSON.parse(res.body))
              // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
              // this.recvList.push(JSON.parse(res.body))
            })
          },
          error => {
            // 소켓 연결 실패
            console.log('소켓 연결 실패', error)
            this.connected = false
          }
        )
      }
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
      this.connected = false
    }
  }
}

export default mixinRealSiseDetail
