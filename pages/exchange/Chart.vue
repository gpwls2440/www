<template>
  <div class="exchange_Right">
    <!-- exchange_Right -->

    <div class="top_area">
      <p class="tit">
        <span class="b1"><img :src="require(`~/assets/images/coin/${symbol}.png`)" :alt="symbol" style="width: 32px" /></span>
        <a href="javascript://" class="w_area_btn">
          <span class="st1">{{ coinName }}</span> <span class="st2">{{ symbol }}/{{ market }} </span>
          <span class="b2"><img src="~/assets/images/arr_btn.png" alt="" /></span>
        </a>
      </p>
      <div class="w_area mCustomScrollbar">
        <ul>
          <li v-for="(coin, index) in coinInfoList" :key="index" class="isCoinSelectBtn">
            <a :title="coin.coinName" @click="loadData(coin.symbol, coin.market)"
              >{{ coin.coinName }}
              <span>({{ coin.symbol }}/{{ coin.market }})</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="javascript://" class="slideup_btn1"><img src="~/assets/images/ex_btn_off.gif" alt="" /></a>
    </div>
    <div class="top_value">
      <!-- top_value -->
      <p id="openPrice" class="st1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">
        {{ coinInfo.lastPrice }} <span>{{ market }}</span>
        <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
      </p>
      <p class="st2">
        <span class="sec1">{{ $t('24hrchange') }}</span>
        <span class="sec2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnRate }}% &nbsp; </span>
        <span class="sec2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }"
          ><font v-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font v-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{{ coinInfo.updnPrice }}</span
        >
        <span v-if="market != 'KRW'" class="sec2 won_price1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }"
          ><font v-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font v-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{{ coinInfo.updnPrice }} <span>KRW</span></span
        >
      </p>

      <div class="top_right">
        <!-- top_right -->
        <ul>
          <li style="float: left">
            <span class="sec1">{{ $t('high') }}</span> <span class="sec2 red">{{ coinInfo.highPrice }} </span>
            <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
          </li>
          <li style="float: right">
            <span class="sec3" style="width: 160px">{{ $t('volume') }}({{ $t('lately24h') }})</span>
            <span class="sec4"
              >{{ coinInfo.totalVol }} <span class="n1">{{ coinInfo.symbol }}</span></span
            >
          </li>
        </ul>
        <ul>
          <li style="float: left">
            <span class="sec1">{{ $t('low') }}</span> <span class="sec2 blue">{{ coinInfo.lowPrice }} </span>
            <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
          </li>
          <li style="float: right">
            <span class="sec3" style="width: 160px">{{ $t('total') }}</span>
            <span class="sec4"
              >{{ coinInfo.totalAmount }} <span class="n1">{{ market }}</span></span
            >
          </li>
        </ul>
      </div>
      <!-- // top_right -->
    </div>
    <!-- // top_value -->
    <div class="slideup_con1">
      <!-- slideup_con -->
      <div id="chart" class="exchange_Right_graph"></div>
      <div id="chartMask" class="chartMask"></div>
    </div>
    <!-- // slideup_con -->
  </div>
  <!-- exchange_Right -->
</template>

<script>
import { mapGetters } from 'vuex'
import { coinList, coinInfo } from '~/api/coin'

export default {
  name: 'Chart',
  props: {
    symbolMarket: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      coinName: '',
      symbol: 'BTC',
      market: '',
      coinInfoList: [],
      coinInfo: {},
      basicPrice: ''
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket'])
  },
  mounted() {
    this.getCoinList()
    this.getCoinInfo()
  },
  updated() {
    // this.getCoinInfo()
    console.log('update')
  },
  methods: {
    getCoinList() {
      const vm = this
      coinList().then(res => {
        vm.coinInfoList = res.data
      })
    },
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
