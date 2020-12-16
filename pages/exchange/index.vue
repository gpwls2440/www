<template>
  <div v-cloak id="container_ex">
    <!-- container -->
    <div id="ExchangeCtrl" class="contents">
      <!-- contents -->
      <div id="CoinInfoCtrl" class="ex_wrapper">
        <!-- ex_wrapper -->
        <coin-sise></coin-sise>
        <chart :symbol-market="symbolMarket"></chart>
        <div class="exchange2_cb">
          <!-- 주문, 호가, 거래내역 영역-->
          <div class="exchange2_Left">
            <!--주문, 거래내역 영역 -->
            <order></order>
            <transacionHist></transacionHist>
          </div>
          <hoga></hoga>
        </div>
        <!-- 채결내역, 코인소셜, 코인설명 영역 -->
        <tradehist></tradehist>
      </div>
    </div>
  </div>
</template>
<script>
import coinSise from './CoinSise'
import chart from './Chart'
import order from './Order'
import transacionHist from './TransacionHist'
import hoga from './Hoga'
import tradehist from './TradeHist'

import '@/assets/css/exchange.css'

export default {
  components: {
    coinSise,
    chart,
    order,
    transacionHist,
    hoga,
    tradehist
  },
  data() {
    return {
      symbolMarket: ''
    }
  },
  mounted() {}
}
</script>
