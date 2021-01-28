<template>
  <div class="top">
    <!-- top -->
    <div class="left" style="height: 500px">
      <ul id="OrderListCtrl" class="table_type_h2">
        <li>
          <span class="th th_l">{{ $t('price') }}({{ market }})</span>
          <span class="th th_c">{{ $t('quantity') }}({{ symbol }})</span>
          <span class="th th_r">{{ $t('totalamount') }}({{ market }})</span>
        </li>
        <div id="orderDiv" class="table_scroll mCustomScrollbar" resize>
          <ul class="table_type_h2">
            <li v-for="(ask, index) in askInfoList" :key="index" class="askLi">
              <!--
              <li v-for="(ask, index) in $options.filters.askbidHeight(coinInfo.askInfoList, index)" :key="index" class="askLi">
              -->
              <span class="l red">{{ ask.price }}</span>
              <span class="c" style="padding-right: 5px; width: 90px; font-size: 10px"
                >{{ ask.qty }} <span v-show="ask.myOrder > 0"> ({{ ask.myOrder }})</span></span
              >
              <span class="r">{{ ask.price | calcPrice(ask.qty) }}</span>
              <span class="bar1" :style="`width:${ask.percent}%`"></span>
            </li>
            <li class="center">
              <span class="t1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.lastPrice }}</span>
              <span class="ico" :class="{ ico_up: coinInfo.updnSign == '1', ico_down: coinInfo.updnSign == '-1' }"></span>
              <span class="t2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnPrice }}</span>
            </li>
            <li v-for="(bid, index) in coinInfo.bidInfoList" :key="index + 10" class="bidLi">
              <span class="l blue">{{ bid.price }}</span>
              <span class="c" style="padding-right: 5px; width: 90px; font-size: 10px"
                >{{ bid.qty }} <span v-show="bid.myOrder > 0"> ({{ bid.myOrder }})</span></span
              >
              <span class="r">{{ bid.price | calcPrice(bid.qty) }}</span>
              <span class="bar2" :style="`width:${bid.percent}%`"></span>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div class="right">
      <ul class="table_type_h2">
        <li>
          <span class="th th_l2">{{ $t('price') }}({{ market }})</span>
          <span class="th th_c2" style="width: 100px; text-align: right">{{ $t('quantity') }}({{ symbol }})</span>
          <span class="th th_r2" style="width: 54px">{{ $t('time') }}</span>
        </li>
        <div class="table_scroll mCustomScrollbar">
          <ul class="table_type_h2">
            <li v-for="(tick, index) in tickList" :key="index">
              <span class="l" :class="{ red: tick.updnSign == '1', blue: tick.updnSign == '-1' }">{{ tick.mtchPrc | commaFilter }}</span>
              <span class="c" style="padding-right: 10px; width: 80px; font-size: 10px" :class="{ red: tick.preUpdnSign == '1', blue: tick.preUpdnSign == '-1' }">{{ tick.mtchQty }}</span>
              <span class="r" style="width: 68px">{{ tick.mtchTime | hhmmssFilter }}</span>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <p class="table_line" style="height: 584px"></p>
  </div>
  <!-- // top -->
</template>

<script>
import { mapGetters } from 'vuex'
import { coinInfo } from '~/api/coin'
import { tickList } from '~/api/exchange'

export default {
  name: 'Hoga',
  components: {},
  data() {
    return {
      market: '',
      symbol: 'BTC',
      coinInfo: {},
      askInfoList: [],
      bidInfoList: [],
      tickList: []
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket'])
  },
  mounted() {
    this.getCoinInfo()
    this.getTickList()
    $('#left_section .live_graph').css('height', $(window).height() - 110)
    $('#right_section .top').css('height', $(window).height() - 494)

    const posY1 = $('#right_section .top').height()
    $('#right_section .top .left .table_scroll').css('height', posY1 - 31)
    const posY2 = $('#right_section .top').height()
    $('#right_section .top .right .table_scroll').css('height', posY2 - 31)

    $(window)
      .resize(function () {
        $('#left_section .live_graph').css('height', $(window).height() - 110)
        $('#right_section .top').css('height', $(window).height() - 494)

        const posY1 = $('#right_section .top').height()
        $('#right_section .top .left .table_scroll').css('height', posY1 - 31)
        const posY2 = $('#right_section .top').height()
        $('#right_section .top .right .table_scroll').css('height', posY2 - 31)
      })
      .resize()
  },
  methods: {
    getCoinInfo() {
      const vm = this
      coinInfo(vm.getSymbolMarket).then(res => {
        vm.coinInfo = res.data.coinInfo
        vm.askInfoList = vm.coinInfo.askInfoList
        vm.bidInfoList = vm.coinInfo.bidInfoList
        vm.market = res.data.market
        vm.symbol = res.data.symbol
      })
    },
    getTickList() {
      const vm = this
      tickList(vm.symbol).then(res => {
        vm.tickList = res.data
      })
    }
  }
}
</script>
