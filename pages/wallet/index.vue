<template>
  <div id="container">
    <!-- container -->
    <div class="contents">
      <!-- contents -->
      <div class="con_layout5">
        <!-- con_layout5 -->
        <MyCoins :wallet-list="walletList" :total-amt="totalAmt"></MyCoins>
        <MyWalletChart :tot-symbol="totSymbol" :coin-eval="coinEval" :total-amt="totalAmt"></MyWalletChart>
        <MyWallet></MyWallet>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyCoins from './MyCoins'
import MyWalletChart from './MyWalletChart'
import MyWallet from './MyWallet'
import { myCoins } from '~/api/balance'
import '@/assets/css/wallet.css'
import { calcPrice } from '~/plugins/util'

export default {
  // middleware: 'authenticated',
  components: {
    MyCoins,
    MyWalletChart,
    MyWallet
  },
  data() {
    return {
      symbol: '',
      walletList: [],
      totalAmt: 0,
      totSymbol: [],
      coinEval: []
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  mounted() {
    this.getMyCoins()
  },
  methods: {
    getMyCoins() {
      const vm = this
      myCoins(vm.symbol, '2', vm.getSessionId, vm.getUid).then(res => {
        vm.walletList = res.data
        vm.walletList.forEach(function (item, index, arr) {
          vm.totalAmt += Number(item.dpoQty)
          vm.totSymbol.push(arr[index].symbol)
          const coinEval = calcPrice(arr[index].lastPrice, arr[index].dpoQty)
          vm.coinEval.push(coinEval.toString())
        })
      })
    }
  }
}
</script>
<style>
.pointColor {
  color: #00b9b2;
  font-weight: bold;
}
.red {
  color: #e4292b !important;
}
.blue {
  color: #2c5ac1 !important;
}

.mCustomScrollbar {
  overflow: auto;
}

.applyList {
  height: 95px;
  overflow: auto;
  width: 440px;
  margin: 0 auto;
  margin-top: 20px;
}
.applyList p {
  margin-bottom: 10px;
}
.applyList table {
  width: 100%;
}
.applyList tr {
  border-bottom: 1px solid #eceef6;
}
.applyList th {
  padding: 8px 20px;
  background: #efefef;
}
.applyList td {
  padding: 5px 20px;
  text-align: center;
}
.applyList li .st1 {
  font-size: 13px;
  color: #8b90a6;
  width: 50%;
}
.applyList li .st2 {
  font-size: 15px;
  color: #444444;
  width: 30%;
}
.bk_list > ul > li {
  position: relative;
}
.wlt1ConLeftTextH2 {
  width: 300px;
  margin-left: 220px;
}
.viewRight {
  width: 30px;
  height: 20px;
  margin: 10px auto 0px;
  display: block;
  font-size: 0px;
  cursor: pointer;
}

.viewRight.on {
  /*background: url('../../assets/images/') center center no-repeat;*/
}

.viewRight.off {
  /*background: url('../../assets/images/btn_off.png') center center no-repeat;*/
}

.warning {
  /*background: url('../../assets/images/icon_pkmark.png') no-repeat;*/
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
</style>
