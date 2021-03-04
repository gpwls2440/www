<template>
  <div id="DoughnutCtrl" class="center_area">
    <!-- center_area -->
    <div class="center_top">
      <!-- center_top -->
      <p>{{ $t('walletManagement') }}</p>
      <a href="javascript:void(0)" class="btn_left_slide"><img src="~/assets/images/005/arr_l_off.gif" alt="" /></a>
      <a href="javascript:void(0)" class="btn_right_slide"><img src="~/assets/images/005/arr_r_off.gif" alt="" /></a>
    </div>
    <!-- // center_top -->
    <div class="center_gm">
      <p v-show="symbol != ''" class="st1">
        <img v-if="symbol != ''" class="circle" :src="require(`~/assets/images/coin/${symbol}.png`)" alt="" width="30" />
        {{ symbolName }}
        <span class="gray">({{ symbol }})</span>
        <span class="small_btn allCoin" @click="onBlock('')">
          {{ $t('totalassets') }}
        </span>
      </p>
      <p v-show="symbol == ''" class="st1" style="font-size: 24px; font-weight: bold">{{ $t('myassets') }}</p>
      <div class="gm">
        <div class="wlt1ConLeft1">
          <!-- wlt1ConLeft -->
          <div class="wlt1ConLeftGraph">
            <DoughnutChart :tot-symbol="totSymbol" :coin-eval="coinEval"></DoughnutChart>
            <img id="total0" src="~/assets/images/total0.png" style="display: none; width: 500px" />
          </div>
          <div v-show="curSymbol.symbol != ''" class="wlt1ConLeftText">
            <h2 class="wlt1ConLeftTextH2">
              <span class="wColor ng-binding" style="color: #222222; font-size: 26px; margin-top: 20px">
                <span
                  v-show="curSymbol.symbol == 'KDP' || curSymbol.symbol == 'KRW' || curSymbol.symbol == 'KDMP'"
                  count-up
                  duration="0.8"
                  decimals="0"
                  start-val="0"
                  end-val="curSymbol.dpoQty"
                ></span>
                <span
                  v-show="curSymbol.symbol != 'KDP' && curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDMP' && curSymbol.dpoQty != 0"
                  count-up
                  duration="0.8"
                  decimals="8"
                  start-val="0"
                  end-val="curSymbol.dpoQty"
                ></span>
                <span
                  v-show="curSymbol.symbol != 'KDP' && curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDMP' && curSymbol.dpoQty == 0"
                  count-up
                  duration="0.8"
                  decimals="0"
                  start-val="0"
                  end-val="curSymbol.dpoQty"
                ></span>
                <span>{{ curSymbol.symbol }}</span>
              </span>
            </h2>
            <h5 v-if="curSymbol.dpoPdngQty != 0" class="wlt1ConLeftTextH5">
              <span class="wltData3 wlt2BfAf ng-binding" :class="{ red: curSymbol.dpoPdngQty > 0, blue: curSymbol.dpoPdngQty < 0 }" style="font-size: 20px">
                <span count-up start-val="0" duration="0.8" decimals="8" end-val="curSymbol.dpoPdngQty"></span>
              </span>
            </h5>
          </div>
          <div v-show="curSymbol.symbol == ''" class="wlt1ConLeftText" style="top: 320px">
            <h2 class="wlt1ConLeftTextH2">
              <span class="wColor ng-binding" style="color: #222222; font-size: 26px; margin-top: 20px">
                <span>{{ totalAmt | toFixed | commaFilter }}</span>
                <span>KRW</span>
              </span>
            </h2>
            <h5 v-if="totalQty.dpoPdngAmt != 0" class="wlt1ConLeftTextH5">
              <span class="wltData3 wlt2BfAf ng-binding" :class="{ red: totalQty.dpoPdngAmt > 0, blue: totalQty.dpoPdngAmt < 0 }" style="font-size: 20px">
                <span count-up start-val="0" end-val="totalQty.dpoPdngAmt"></span>
              </span>
            </h5>
          </div>
          <div v-show="showCoin" class="chartBottomText">
            {{ $t('tokendescription') }}
          </div>
        </div>
        <!-- // wlt1ConLeft -->
      </div>
    </div>
  </div>
  <!-- // center_area -->
</template>

<script>
import EventBus from '../eventBus'
import DoughnutChart from './DoughnutChart'

export default {
  name: 'MyWalletChart',
  components: {
    DoughnutChart
  },
  props: {
    totSymbol: {
      type: Array,
      default() {
        return []
      }
    },
    coinEval: {
      type: Array,
      default() {
        return []
      }
    },
    totalAmt: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      symbol: '',
      symbolName: '',
      curSymbol: {
        in: '',
        symbol: ''
      },
      totalQty: {
        dpoPdngAmt: ''
      },
      showCoin: false
    }
  },
  created() {
    EventBus.$on(
      'walletItem',
      function (payload) {
        this.symbol = payload.symbol
        this.symbolName = payload.symbolName
      }.bind(this)
    )
  }
}
</script>
