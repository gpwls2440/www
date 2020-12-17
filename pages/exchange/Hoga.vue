<template>
  <div id="OrderListCtrl" class="exchange2_Right">
    <!-- exchange2_Right -->
    <div class="exchange2_Right_top">
      {{ $t('orders') }}
      <a href="javascript://" class="slideup_btn3"><img src="~/assets/images/ex_btn_off.gif" alt="" /></a>
    </div>

    <div class="slideup_con3">
      <div class="ex_table_type5">
        <table style="border-collapse: separate">
          <colgroup>
            <col style="width: 21%" />
            <col style="width: 22%" />
            <col style="width: 18%" />
            <col style="width: * %" />
          </colgroup>
          <tbody>
            <tr v-for="(ask, index) in coinInfo.askInfoList" :key="index">
              <td class="tr pricetd" @click="setPrice(ask.price)">
                <span class="price"
                  ><span v-show="ask.myOrder > 0">({{ ask.myOrder }}) </span> {{ ask.qty }}</span
                >
                <span class="gauge"><span class="num" :style="`width:${ask.percent}%`"></span></span>
              </td>
              <td class="bg1" :class="{ line2: market != 'KRW', border_l: ask.price == coinInfo.lastPrice }" @click="setPrice(ask.price)">
                <span :class="{ red: ask.pricePer > 0, blue: ask.pricePer < 0 }">{{ ask.price }}</span>
                <p v-if="market != 'KRW'" class="won_price small">{{ basicPrice }}<span>KRW</span></p>
              </td>
              <td class="bg1" :class="{ border_r: ask.price == coinInfo.lastPrice }" @click="setPrice(ask.price)">
                <span :class="{ red: ask.pricePer > 0, blue: ask.pricePer < 0 }">{{ ask.pricePer | toFixed2 }}%</span>
              </td>
              <td v-show="index == 0" rowspan="10">
                <div class="row_pop" style="top: 5px">
                  <!-- row_pop -->
                  <div class="row_l">
                    <div class="left">{{ $t('volume') }}</div>
                    <div class="right">{{ coinInfo.totalVol }} {{ coinInfo.symbol }}</div>
                    <div class="left">{{ $t('total') }}</div>
                    <div class="right">
                      {{ coinInfo.totalAmount }} {{ market }}
                      <p class="gray">({{ $t('lately24h') }})</p>
                    </div>
                  </div>

                  <div class="row_l">
                    <div class="left">{{ $t('52whigh') }}</div>
                    <div class="right">
                      <span class="red">{{ coinInfo.highestPrice }}</span>
                      <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
                      <p class="gray">({{ coinInfo.highestDate }})</p>
                    </div>
                  </div>
                  <div class="row_l">
                    <div class="left">{{ $t('52wlow') }}</div>
                    <div class="right">
                      <span class="blue">{{ coinInfo.lowestPrice }}</span>
                      <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
                      <p class="gray">({{ coinInfo.lowestDate }})</p>
                    </div>
                  </div>

                  <div class="row_l">
                    <div class="left">{{ $t('closingprice') }}</div>
                    <div class="right">
                      <span class="black">{{ coinInfo.openPrice }}</span>
                      <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
                    </div>
                  </div>
                  <div class="row_l">
                    <div class="left">{{ $t('todayhigh') }}</div>
                    <div class="right">
                      <span class="red">{{ coinInfo.highPrice }}</span>
                      <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
                      <p class="red">{{ coinInfo.highPricePer | toFixed2 }}%</p>
                    </div>
                  </div>
                  <div class="row_l" style="border-bottom: 0">
                    <div class="left">{{ $t('todaylow') }}</div>
                    <div class="right">
                      <span class="blue">{{ coinInfo.lowPrice }}</span>
                      <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
                      <p class="blue">{{ coinInfo.lowPricePer | toFixed2 }}%</p>
                    </div>
                  </div>
                </div>
                <!-- // row_pop -->
              </td>
            </tr>

            <tr v-for="(bid, index) in coinInfo.bidInfoList" :key="index + 10">
              <td class="empty"></td>
              <td class="bg2" :class="{ line2: market != 'KRW', border_l: bid.price == coinInfo.lastPrice }" @click="setPrice(bid.price)">
                <span :class="{ red: bid.pricePer > 0, blue: bid.pricePer < 0 }">{{ bid.price }}</span>
                <p v-if="market != 'KRW'" class="won_price small">{{ basicPrice }}<span>KRW</span></p>
              </td>
              <td class="bg2" :class="{ border_r: bid.price == coinInfo.lastPrice }" @click="setPrice(bid.price)">
                <span :class="{ red: bid.pricePer > 0, blue: bid.pricePer < 0 }">{{ bid.pricePer | toFixed2 }}%</span>
              </td>
              <td class="tl pricetd" @click="setPrice(bid.price)">
                <span class="price"
                  >{{ bid.qty }}<span v-show="bid.myOrder > 0"> ({{ bid.myOrder }})</span></span
                >
                <span class="gauge"><span class="num2" :style="`width:${bid.percent}%`"></span></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- exchange2_Right -->
</template>
<script>
import { mapGetters } from 'vuex'
import { coinInfo } from '~/api/coin'
export default {
  name: 'Hoga',
  data() {
    return {
      coinInfo: {},
      basicPrice: '12,000,000',
      market: 'KRW'
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
