<template>
  <div class="left_area">
    <!-- left_area -->
    <div class="left_top" @click="onBlock('')">
      <p class="st1">{{ $t('totalassets') }}</p>
      <p class="st2">
        ￦<span>{{ totalAmt | toFixed | commaFilter }}</span>
      </p>
      <!--
      <p v-show="totalQty.dpoPdngAmt != 0" class="st3" :class="{ red: totalQty.dpoPdngAmt > 0, blue: totalQty.dpoPdngAmt < 0 }">
        (<span>{{ totalQty.dpoPdngAmt }}</span
        >)
      </p>
      -->
    </div>
    <span class="small_btn ableCoin" :class="{ on: viewMode == 1 }" @click="setMode()">
      {{ $t('retainedcoin') }}
    </span>
    <div style="height: 560px; overflow: auto">
      <div class="bk_list">
        <!-- bk_list -->
        <ul class="">
          <li v-for="(coins, index) in walletList" v-show="tokenViewFlag || coins.coinType != '2'" :key="index" :class="{ active: coins.symbol == curSymbol.symbol, token: coins.coinType == '2' }">
            <a href="javascript:void(0);" @click="onBlock(coins.symbol, coins.coinType)">
              <span class="st1">
                <!--
                <img :src="require(`~/assets/images/coin/${coins.symbol}.png`)" :alt="`${coins.symbol}`" />
                -->
                <span class="ml5">{{ coins.symbolName }}</span
                ><span class="gray">({{ coins.symbol }})</span>
              </span>
              <span class="st2">
                <span v-if="coins.symbol == 'KRW'" class="ml5">{{ coins.dpoQty | toFixed | commaFilter }}</span>
                <span v-else class="ml5">{{ coins.dpoQty | toFixed8 | commaFilter }}</span>
              </span>
              <span v-show="coins.symbol != 'KRW'" class="st2 won_price">
                <span>{{ coins.dpoQty | toFixed | calcPrice(coins.lastPrice, coins.dpoQty) }}</span>
                <span>KRW</span>
              </span>
            </a>
            <a v-if="coins.symbol == 'ETH' && tokenCount > 0 && tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
              <span :title="$t('tokenclose')" class="tokenView"><img src="~/assets/images/btn_on.png" /></span
            ></a>
            <a v-if="coins.symbol == 'ETH' && tokenCount > 0 && !tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
              <span :title="$t('tokenopen')" class="tokenView"><img src="~/assets/images/btn_off.png" /></span>
            </a>
          </li>
        </ul>
      </div>
      <!-- // bk_list -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyCoins',
  props: {
    walletList: {
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
      totalQty: {},
      viewMode: '0',
      tokenViewFlag: '1',
      curSymbol: {
        symbol: '',
        name: '',
        dpoQty: 0,
        ableQty: 0,
        dpoPdngQty: 0,
        dpoAmt: 0,
        shortMnthQty: 0,
        lastPrice: 0,
        color: '',
        addr: '',
        point: 0,
        tokenType: 1,
        KDAblockQty: 0,
        KdaPointQty: 0
      },
      tokenCount: '',
      symbol: ''
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  methods: {
    setMode() {
      this.viewMode = '1'
    }
  }
}
</script>
