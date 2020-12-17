<template>
  <div id="left_section">
    <!-- left_section -->
    <div class="live_graph">
      <!-- live_graph -->
      <div id="CoinInfoCtrl" class="chart_top">
        <div style="float: left">
          <span style="margin-left: 20px" class="wc_area_btn">
            <span class="st1 white">{{ coinName }}</span> <span class="st2">{{ symbol }}/{{ market }} </span>
          </span>
        </div>
        <div class="topInfo">
          <span class="topSpan">
            <span class="white" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.lastPrice }}</span> <span>{{ market }}</span>
            <span v-if="market != 'KRW'">
              (<span class="white" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }"> {{ basicPrice }}</span> <span>KRW</span>)
            </span>
          </span>
          <span class="topSpan minWidth1">
            <span class="sec2 white" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnPrice }}</span>
            (<span class="sec2 white" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnRate }}% </span>)
          </span>
          <span class="topSpan minWidth">
            <span class="sec1">{{ $t('high') }}</span> <span class="sec2 red">{{ coinInfo.highPrice }} </span> <span class="sec1">{{ $t('low') }}</span>
            <span class="sec2 blue">{{ coinInfo.lowPrice }} </span>
          </span>
          <span class="topSpan">
            <span class="sec3">{{ $t('volume') }}</span>
            <span class="sec4 white"> {{ coinInfo.totalVol }} </span>
            <span class="n1">{{ coinInfo.symbol }}</span>
          </span>
        </div>
        <div class="wc_area mCustomScrollbar">
          <ul>
            <li v-for="(coin, index) in coinInfoList" :key="index" class="isCoinSelectBtn" @click="loadData(coin.symbol, coin.market)">
              {{ coin.coinName }}
              <span>({{ coin.symbol }}/{{ coin.market }})</span>
            </li>
          </ul>
        </div>
      </div>
      <div id="chart" style="height: 912px">
        <span style="color: #fff; font-size: 30px">차트</span>
      </div>
    </div>
    <!-- // live_graph -->
  </div>
  <!-- // left_section -->
</template>

<script>
import { mapGetters } from 'vuex'
import { coinInfo } from '~/api/coin'

export default {
  name: 'Chart',
  data() {
    return {
      coinName: '비트코인',
      symbol: 'BTC',
      market: 'KRW',
      coinInfo: {},
      coinInfoList: [],
      basicPrice: ''
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket'])
  },
  mounted() {
    this.getCoinInfo()
  },
  methods: {
    getCoinInfo() {
      const vm = this
      coinInfo(vm.getSymbolMarket).then(res => {
        vm.coinInfo = res.data.coinInfo
        vm.coinName = res.data.coinName
        vm.market = res.data.market
        vm.symbol = res.data.symbol
      })
    }
  }
}
</script>
