<template>
  <div class="container">
    <div id="output"></div>
    <table>
      <thead>
        <tr>
          <th>체결일시</th>
          <th>체결가격</th>
          <th>체결량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in transactionList" :key="i">
          <td>{{ item.contDtm }}</td>
          <td>{{ item.contPrice }}</td>
          <td>{{ item.contQty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocket: null,
      transactionList: []
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
      let msg = { type: 'transaction', symbols: ['BTC_KRW'], tickTypes: ['30M'] }
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
      console.log('jsonData.content.list[0]: ' + jsonData.content.list[0])
      this.transactionList.push(jsonData.content.list[0])
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
      const output = document.getElementById('output')
      output.appendChild(pre)
    }
  }
}
</script>
