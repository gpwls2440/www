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
        <div id="orderDiv" class="table_scroll" resize>
          <ul class="table_type_h2">
            <li v-for="ask in coinInfo.askInfoList" :key="ask" class="askLi" @click="setPrice(ask.price)">
              <span class="l red">{{ ask.price }}</span>
              <span class="c" style="padding-right: 5px; width: 105px; font-size: 10px"
                >{{ ask.qty }} <span v-show="ask.myOrder > 0"> ({{ ask.myOrder }})</span></span
              >
              <span class="r">{{ ask.price }}</span>
              <span class="bar1" :style="{ width: '{{ ask.percent  }}%' }"></span>
            </li>
            <li class="center" @click="setPrice(coinInfo.lastPrice)">
              <span class="t1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.lastPrice }}</span>
              <span class="ico" :class="{ ico_up: coinInfo.updnSign == '1', ico_down: coinInfo.updnSign == '-1' }"></span>
              <span class="t2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnPrice }}</span>
            </li>
            <li v-for="bid in coinInfo.bidInfoList" :key="bid" class="bidLi" @click="setPrice(bid.price)">
              <span class="l blue">{{ bid.price }}</span>
              <span class="c" style="padding-right: 5px; width: 105px; font-size: 10px"
                >{{ bid.qty }} <span v-show="bid.myOrder > 0"> ({{ bid.myOrder }})</span></span
              >
              <span class="r">{{ bid.price | calcPrice:bid.qty  }}</span>
              <span class="bar2" :style="{ width: '{{ bid.percent  }}%' }"></span>
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
            <li v-for="tick in tickList" :key="tick" @click="setPrice(tick.mtchPrc)">
              <span class="l" :class="{ red: tick.updnSign == '1', blue: tick.updnSign == '-1' }">{{ tick.mtchPrc }}</span>
              <span class="c" style="padding-right: 10px; width: 100px; font-size: 10px" :class="{ red: tick.preUpdnSign == '1', blue: tick.preUpdnSign == '-1' }">{{ tick.mtchQty }}</span>
              <span class="r" style="width: 40px">{{ tick.mtchTime }}</span>
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
export default {
  name: 'Hoga',
  components: {},
  data() {
    return {
      market: 'KRW',
      symbol: 'BTC',
      coinInfo: {
        askInfoList: [
          {
            price: '23,047,000',
            qty: '0.001'
          }
        ],
        bidInfoList: [
          {
            price: '23,047,000',
            qty: '0.001'
          }
        ]
      },
      tickList: [
        {
          mtchPrc: '20,950,000',
          mtchQty: '0.014',
          mtchTime: '08:19:55'
        },
        {
          mtchPrc: '20,950,000',
          mtchQty: '0.014',
          mtchTime: '08:19:55'
        },
        {
          mtchPrc: '20,950,000',
          mtchQty: '0.014',
          mtchTime: '08:19:55'
        },
        {
          mtchPrc: '20,950,000',
          mtchQty: '0.014',
          mtchTime: '08:19:55'
        },
        {
          mtchPrc: '20,950,000',
          mtchQty: '0.014',
          mtchTime: '08:19:55'
        }
      ]
    }
  }
}
</script>
