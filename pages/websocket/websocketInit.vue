<script>
export default {
  data() {
    return {
      websocket: null,
      jsonData: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const wsUri = 'wss://pubwss.bithumb.com/pub/ws'
      this.websocket = new WebSocket(wsUri)
      this.websocket.binaryType = 'arraybuffer'

      this.websocket.onopen = evt => {
        this.onOpen(evt)
      }
      this.websocket.onclose = evt => {
        this.onClose(evt)
      }
      this.websocket.onmessage = evt => {
        this.onMessage(evt)
      }
    },
    onOpen(evt) {
      console.log('연결되었습니다.')
      let msg = { type: 'transaction', symbols: ['BTC_KRW'], tickTypes: ['30M'] }
      msg = JSON.stringify(msg)
      this.doSend(msg)
    },
    doSend(sendMsg) {
      console.lod('발신메세지: ' + sendMsg)
      this.websocket.send(sendMsg)
    },
    onClose(evt) {
      console.log('연결해제')
    },
    onMessage(evt) {
      this.jsonData = JSON.parse(evt.data)
    }
  }
}
</script>
