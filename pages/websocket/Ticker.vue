<template>
  <div class="container">
    <p>{{ obj }}</p>
    <p>{{ closePrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocket: null,
      obj: null,
      closePrice: null
    }
  },
  created() {},
  mounted() {
    // window.addEventListener('load', this.init(), false)
    this.init()
  },
  methods: {
    init() {
      this.testWebSocket()
    },
    testWebSocket() {
      const wsUri = 'wss://pubwss.bithumb.com/pub/ws' // 접속정보
      this.websocket = new WebSocket(wsUri)
      this.websocket.binaryType = 'arraybuffer'
      // websocket.binaryType = 'Blob';
      // websocket.binaryType = 'String';
      this.websocket.onopen = evt => {
        this.onOpen(evt)
      }
      this.websocket.onclose = evt => {
        this.onClose(evt)
      }
      this.websocket.onmessage = evt => {
        this.onMessage(evt)
      }
      this.websocket.onerror = evt => {
        this.onError(evt)
      }
    },
    onOpen(evt) {
      this.writeToScreen(evt + ' : 연결완료')
      // 체결
      let msg = { type: 'ticker', symbols: ['BTC_KRW'], tickTypes: ['30M'] }
      msg = JSON.stringify(msg)
      this.doSend(msg)
    },
    onClose(evt) {
      this.writeToScreen('연결해제')
    },
    onMessage(evt) {
      // const enc = new TextDecoder('utf-8')
      // const arr = new Uint8Array(evt.data)
      // console.log(enc.decode(arr))
      const jsonData = JSON.parse(evt.data)
      this.obj = jsonData.content
      this.closePrice = this.obj.closePrice
      // this.writeToScreen('<span style="color: blue;">수신: ' + evt.data+ '</span>')
      // this.websocket.close()
    },
    onError(evt) {
      this.writeToScreen('<span style="color: red;">에러:</span> ' + evt.data)
    },
    doSend(message) {
      this.writeToScreen('발신: ' + message)
      this.websocket.send(message)
    },
    writeToScreen(message) {
      const pre = document.createElement('p')
      pre.style.wordWrap = 'break-word'
      pre.innerHTML = message
      // const output = document.getElementById('output')
      // output.appendChild(pre)
    }
  }
}
</script>
